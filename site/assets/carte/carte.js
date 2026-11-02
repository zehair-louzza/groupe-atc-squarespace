/* Carte interactive Île-de-France — GROUPE ATC
 * Niveau 0 : région + 8 départements · Niveau 1 : communes du département · Niveau 2 : plan détaillé (OpenStreetMap)
 * Bibliothèque : MapLibre GL JS (auto-hébergée). Plan : tuiles vectorielles OpenFreeMap (OpenMapTiles / OSM), sans clé.
 * Données : assets/carte/donnees-idf.js (geo.api.gouv.fr — INSEE COG, IGN).
 * La sélection d'une ville mène au formulaire de devis pré-rempli avec cette ville.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-idf-map]');
  if (!root) return;
  const here = document.currentScript ? document.currentScript.src : location.href;
  const base = new URL('.', here);                       // …/assets/carte/
  const vendor = new URL('../vendor/maplibre/', base);
  const contactUrl = new URL('../../contact.html', base);
  const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
  const BG = '#F6F3EE', ACCENT = '#B85C2E', ACCENT_DARK = '#8E4220';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const T1 = reduce ? 0 : 400, T2 = reduce ? 0 : 700;

  const $ = s => root.querySelector(s);
  const title = $('.idf-title'), backs = $('.idf-back'), stage = $('.idf-stage'), canvas = $('.idf-canvas');
  const tip = $('.idf-tooltip'), note = $('.idf-note'), input = $('#idf-q'), list = $('#idf-suggest');
  const fmt = n => Number(n || 0).toLocaleString('fr-FR');
  const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-'’]/g, ' ').replace(/\s+/g, ' ').trim();

  /* ---------- Chargement paresseux (MapLibre + données) ---------- */
  const loadScript = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.append(s); });
  const loadCss = href => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.append(l); };
  let deps;
  const ensureDeps = () => deps || (deps = (async () => {
    loadCss(new URL('maplibre-gl.css', vendor).href);
    await Promise.all([
      window.maplibregl ? null : loadScript(new URL('maplibre-gl.js', vendor).href),
      window.GROUPE_ATC_IDF ? null : loadScript(new URL('donnees-idf.js', base).href),
    ]);
  })());

  /* ---------- Données ---------- */
  let D, byCode, depts, deptBox = {};
  function prepareData() {
    D = window.GROUPE_ATC_IDF;
    depts = D.departements;
    byCode = Object.fromEntries(D.communes.map(c => [c.code, c]));
    D.communes.forEach(c => { c.n = norm(c.nom); });
    for (const f of D.depts.features) deptBox[f.properties.dept] = bbox(f.geometry);
    D.points = { type: 'FeatureCollection', features: D.communes.map(c => ({ type: 'Feature', properties: { code: c.code, nom: c.nom, cp: c.cp[0] || '', pop: c.pop, dept: c.dept }, geometry: { type: 'Point', coordinates: [c.lon, c.lat] } })) };
    D.communesGeo.features.forEach(f => { const c = byCode[f.properties.code]; if (c) { f.properties.nom = c.nom; f.properties.cp = c.cp[0] || ''; } });
  }
  function bbox(g) {
    let a = [180, 90, -180, -90];
    const walk = c => typeof c[0] === 'number' ? (a = [Math.min(a[0], c[0]), Math.min(a[1], c[1]), Math.max(a[2], c[0]), Math.max(a[3], c[1])]) : c.forEach(walk);
    walk(g.coordinates); return [[a[0], a[1]], [a[2], a[3]]];
  }
  const regionBox = () => bbox(D.region.features[0].geometry);
  const cpOf = (c, preferred) => (preferred && c.cp.includes(preferred)) ? preferred : (c.cp[0] || '');

  /* ---------- Lien vers le devis ---------- */
  function quoteHref(c, cp) {
    const u = new URL(contactUrl);
    const p = new URLSearchParams(location.search);
    u.searchParams.set('besoin', ['Travaux', 'Maintenance', 'Dépannage'].includes(p.get('besoin')) ? p.get('besoin') : 'Travaux');
    if (p.get('metier')) u.searchParams.set('metier', p.get('metier'));
    u.searchParams.set('ville', c.nom); u.searchParams.set('code', cp); u.searchParams.set('dept', c.dept);
    u.searchParams.set('deptName', depts[c.dept]); u.searchParams.set('insee', c.code);
    return u.href;
  }

  /* ---------- État & barre haute ---------- */
  const state = { level: 0, dept: null, city: null, cp: null };
  function button(label, fn) { const b = document.createElement('button'); b.type = 'button'; b.className = 'idf-btn'; b.textContent = label; b.addEventListener('click', fn); return b; }
  function renderBar() {
    backs.replaceChildren();
    if (state.level === 0) title.textContent = 'Île-de-France — 8 départements';
    if (state.level === 1) {
      title.textContent = `Département : ${depts[state.dept]} (${state.dept})`;
      backs.append(button('← Retour Île-de-France', () => go({ level: 0 })));
    }
    if (state.level === 2) {
      const c = byCode[state.city];
      title.textContent = `${c.nom} (${state.cp}) — ${depts[c.dept]} (${c.dept})`;
      backs.append(button(`← Retour ${c.dept}`, () => go({ level: 1, dept: c.dept })), button('← Île-de-France', () => go({ level: 0 })));
    }
    root.dataset.level = state.level;
    root.querySelectorAll('.idf-dept-chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dept === state.dept && state.level > 0)));
  }
  function urlFor(s) {
    const u = new URL(location.href);
    ['carte', 'ville', 'cp'].forEach(k => u.searchParams.delete(k));
    if (s.level >= 1) u.searchParams.set('carte', s.dept);
    if (s.level === 2) { u.searchParams.set('ville', s.city); u.searchParams.set('cp', s.cp); }
    u.hash = 'carte'; return u.href;
  }
  function readUrl() {
    const p = new URLSearchParams(location.search), d = p.get('carte'), v = p.get('ville');
    if (v && byCode[v]) return { level: 2, dept: byCode[v].dept, city: v, cp: cpOf(byCode[v], p.get('cp')) };
    if (d && depts[d]) return { level: 1, dept: d };
    return { level: 0 };
  }

  /* ---------- Carte ---------- */
  let map, baseLayers = [], baseBg = null, hasBase = false, marker = null, popup = null, labels = [], hovered = null;
  async function loadBaseStyle() {
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(STYLE_URL, { signal: ctl.signal }); clearTimeout(t);
      if (!r.ok) throw new Error(r.status);
      const style = await r.json();
      for (const l of style.layers) {
        if (l.type === 'background') { baseBg = l.paint && l.paint['background-color']; l.paint = { ...(l.paint || {}), 'background-color': BG }; continue; }
        l.layout = { ...(l.layout || {}), visibility: 'none' }; baseLayers.push(l.id);
      }
      hasBase = true; return style;
    } catch {
      return { version: 8, sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': BG } }] };
    }
  }

  function setBase(visible) {
    if (!hasBase) return;
    for (const id of baseLayers) if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
    map.setPaintProperty('background', 'background-color', visible && baseBg ? baseBg : BG);
  }

  function addLayers() {
    map.addSource('region', { type: 'geojson', data: D.region });
    map.addSource('depts', { type: 'geojson', data: D.depts, promoteId: 'dept' });
    map.addSource('communes', { type: 'geojson', data: D.communesGeo, promoteId: 'code' });
    map.addSource('points', { type: 'geojson', data: D.points, promoteId: 'code' });
    const tints = ['match', ['get', 'dept'], '75', '#E9DCCB', '77', '#EFE6D8', '78', '#ECE3D3', '91', '#F0E5D6', '92', '#E6D9C7', '93', '#EBDFCF', '94', '#E8DCCB', '95', '#EEE4D4', '#EEE4D4'];
    map.addLayer({ id: 'idf-depts-fill', type: 'fill', source: 'depts', paint: { 'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#E2BFA6', tints], 'fill-opacity': 0.92 } });
    map.addLayer({ id: 'idf-communes-fill', type: 'fill', source: 'communes', filter: ['==', ['get', 'dept'], ''], paint: { 'fill-color': ACCENT, 'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.26, 0.05] } });
    map.addLayer({ id: 'idf-communes-line', type: 'line', source: 'communes', filter: ['==', ['get', 'dept'], ''], paint: { 'line-color': ACCENT, 'line-opacity': 0.35, 'line-width': 0.7 } });
    map.addLayer({ id: 'idf-depts-line', type: 'line', source: 'depts', paint: { 'line-color': '#8C7B6B', 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.8, 12, 1.6] } });
    map.addLayer({ id: 'idf-region-line', type: 'line', source: 'region', paint: { 'line-color': '#5A4A3E', 'line-width': 2 } });
    map.addLayer({ id: 'idf-city-line', type: 'line', source: 'communes', filter: ['==', ['get', 'code'], ''], paint: { 'line-color': ACCENT, 'line-width': 3, 'line-dasharray': [2, 1.2] } });
    const r = k => ['interpolate', ['linear'], ['sqrt', ['get', 'pop']], 0, 2.5 * k, 60, 3.5 * k, 150, 6 * k, 300, 10 * k, 470, 14 * k];
    map.addLayer({ id: 'idf-communes-pts', type: 'circle', source: 'points', filter: ['==', ['get', 'dept'], ''], paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 8, r(0.8), 11, r(1.25), 14, r(1.8)],
      'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], ACCENT_DARK, ACCENT],
      'circle-opacity': 0.82, 'circle-stroke-color': '#fff',
      'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2.5, 1] } });
  }

  function deptLabels() {
    labels.forEach(m => m.remove()); labels = [];
    for (const f of D.deptLabels.features) {
      const d = f.properties.dept, el = document.createElement('div');
      el.className = 'idf-label'; el.dataset.dept = d;
      el.innerHTML = `<b>${d}</b><span>${depts[d].replace(/'/g, '’')}</span>`;
      labels.push(new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(f.geometry.coordinates).addTo(map));
    }
    fitLabels();
  }
  function fitLabels() {
    // Le nom s'affiche quand le département est assez grand à l'écran ; sinon le numéro seul.
    for (const m of labels) {
      const el = m.getElement(), b = deptBox[el.dataset.dept];
      const w = map.project(b[1]).x - map.project(b[0]).x;
      el.classList.toggle('is-compact', w < 120);
      el.hidden = state.level !== 0;
    }
  }

  function filters() {
    const d = state.level >= 1 ? state.dept : '';
    map.setFilter('idf-communes-fill', ['==', ['get', 'dept'], state.level === 1 ? d : '']);
    map.setFilter('idf-communes-line', ['==', ['get', 'dept'], state.level === 1 ? d : '']);
    map.setFilter('idf-communes-pts', ['==', ['get', 'dept'], state.level === 1 ? d : '']);
    map.setFilter('idf-city-line', ['==', ['get', 'code'], state.level === 2 ? state.city : '']);
    map.setPaintProperty('idf-depts-fill', 'fill-opacity', state.level === 0 ? 0.92 : state.level === 1 ? ['case', ['==', ['get', 'dept'], d], 0.95, 0.35] : 0);
    map.setLayoutProperty('idf-depts-line', 'visibility', state.level === 2 ? 'none' : 'visible');
    map.setLayoutProperty('idf-region-line', 'visibility', state.level === 2 ? 'none' : 'visible');
  }

  function clearHover() {
    if (hovered) { map.setFeatureState(hovered, { hover: false }); hovered = null; }
    tip.hidden = true; map.getCanvas().style.cursor = '';
  }
  function interactive() {
    if (state.level === 0) return ['idf-depts-fill'];
    if (state.level === 1) return ['idf-communes-pts', 'idf-communes-fill', 'idf-depts-fill'];
    return [];
  }
  function pick(point) {
    const fs = map.queryRenderedFeatures(point, { layers: interactive() });
    if (!fs.length) return null;
    if (state.level === 1) {
      const c = fs.find(f => f.layer.id !== 'idf-depts-fill');
      if (c) return { kind: 'commune', f: c };
      const d = fs[0]; return d.properties.dept !== state.dept ? { kind: 'dept', f: d } : null;
    }
    return { kind: 'dept', f: fs[0] };
  }
  function showTip(point, hit) {
    clearHover();
    if (!hit) return;
    const f = hit.f, src = f.layer.id === 'idf-communes-pts' ? 'points' : f.layer.id === 'idf-communes-fill' ? 'communes' : 'depts';
    hovered = { source: src, id: f.id }; map.setFeatureState(hovered, { hover: true });
    if (hit.kind === 'commune') {
      const c = byCode[f.properties.code]; tip.textContent = `${c.nom} — ${c.cp[0] || ''}`;
      // Met aussi en évidence le point et le contour de la commune
    } else tip.textContent = `${depts[f.properties.dept]} (${f.properties.dept})`;
    tip.hidden = false; map.getCanvas().style.cursor = 'pointer';
    const x = Math.min(point.x + 14, stage.clientWidth - tip.offsetWidth - 8), y = Math.max(point.y - tip.offsetHeight - 10, 8);
    tip.style.transform = `translate(${x}px, ${y}px)`;
  }
  function activate(hit) {
    if (!hit) return;
    if (hit.kind === 'dept') go({ level: 1, dept: hit.f.properties.dept });
    else { const c = byCode[hit.f.properties.code]; go({ level: 2, dept: c.dept, city: c.code, cp: c.cp[0] || '' }); }
  }

  function openPopup() {
    const c = byCode[state.city];
    if (marker) marker.remove(); if (popup) popup.remove();
    const el = document.createElement('div'); el.className = 'idf-popup';
    el.innerHTML = `<p class="idf-popup-name"></p><p class="idf-popup-meta"></p><a class="button idf-quote"></a>`;
    el.querySelector('.idf-popup-name').textContent = `${c.nom} (${state.cp})`;
    el.querySelector('.idf-popup-meta').textContent = `${depts[c.dept]} (${c.dept})${c.pop ? ` · ${fmt(c.pop)} habitants` : ''}`;
    const a = el.querySelector('.idf-quote'); a.href = quoteHref(c, state.cp); a.textContent = 'Demander un devis pour cette ville';
    popup = new maplibregl.Popup({ offset: 34, closeButton: true, maxWidth: '300px', focusAfterOpen: false }).setDOMContent(el);
    const pin = document.createElement('div'); pin.className = 'idf-pin'; pin.setAttribute('role', 'button'); pin.tabIndex = 0;
    pin.setAttribute('aria-label', `${c.nom} : afficher les informations`);
    pin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); marker.togglePopup(); } });
    marker = new maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([c.lon, c.lat]).setPopup(popup).addTo(map);
    marker.togglePopup();
  }

  let deptGuard = 0;
  function apply(animate) {
    clearHover(); renderBar(); if (!map) return;
    filters(); fitLabels();
    if (state.level < 2) { if (marker) { marker.remove(); marker = null; } if (popup) { popup.remove(); popup = null; } }
    setBase(state.level === 2);
    note.hidden = !(state.level === 2 && !hasBase);
    const opt = { duration: animate ? T1 : 0, easing: easeOut };
    if (state.level === 0) map.fitBounds(regionBox(), { ...opt, padding: pad() });
    if (state.level === 1) map.fitBounds(deptBox[state.dept], { ...opt, padding: pad() });
    if (state.level === 2) { const c = byCode[state.city]; map.flyTo({ center: [c.lon, c.lat], zoom: 14.5, duration: animate ? T2 : 0, easing: easeOut, essential: true }); openPopup(); }
    deptGuard++;
  }
  const pad = () => { const s = stage.clientWidth < 600 ? 16 : 36; return { top: s, bottom: s, left: s, right: s }; };

  function go(s, push = true) {
    Object.assign(state, { level: s.level, dept: s.dept || null, city: s.city || null, cp: s.cp || null });
    if (push) history.pushState({ idf: true }, '', urlFor(state));
    if (!map && state.level === 2 && !webgl) { location.href = quoteHref(byCode[state.city], state.cp); return; }
    if (!started) start();
    apply(true);
  }

  let webgl = true, started = false;
  async function start() {
    if (started) return; started = true;
    root.classList.add('is-loading');
    try { await ensureDeps(); } catch { root.classList.add('is-failed'); return; }
    prepareData(); buildChips(); search();
    const test = document.createElement('canvas');
    if (!(test.getContext('webgl2') || test.getContext('webgl'))) webgl = false;
    if (!webgl) { root.classList.remove('is-loading'); root.classList.add('is-failed'); Object.assign(state, readUrl()); renderBar(); return; }
    const style = await loadBaseStyle();
    Object.assign(state, readUrl());
    map = new maplibregl.Map({
      container: canvas, style, bounds: regionBox(), fitBoundsOptions: { padding: 24 },
      minZoom: 7, maxZoom: 18, maxBounds: [[0.6, 47.9], [4.4, 49.6]], attributionControl: false,
      dragRotate: false, pitchWithRotate: false, touchPitch: false, cooperativeGestures: false, renderWorldCopies: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · INSEE / IGN' }), 'bottom-left');
    map.getCanvas().setAttribute('aria-label', 'Carte interactive de l’Île-de-France. Utilisez la recherche ou la liste des départements pour naviguer au clavier.');
    map.on('load', () => {
      addLayers(); deptLabels(); apply(false);
      root.classList.remove('is-loading'); root.classList.add('is-ready');
    });
    map.on('zoom', fitLabels); map.on('resize', fitLabels);
    // Souris : survol = mise en évidence + info-bulle
    map.on('mousemove', e => { if (!touching) showTip(e.point, pick(e.point)); });
    map.on('mouseout', clearHover);
    // Toucher : tap = sélection, appui long (500 ms) = info-bulle
    let touching = false, timer = null, longPress = false;
    map.on('touchstart', e => {
      touching = true; longPress = false; clearTimeout(timer);
      if (e.originalEvent.touches.length > 1) return;
      timer = setTimeout(() => { longPress = true; showTip(e.point, pick(e.point)); }, 500);
    });
    map.on('touchmove', () => clearTimeout(timer));
    map.on('touchend', () => { clearTimeout(timer); if (longPress) setTimeout(clearHover, 1800); setTimeout(() => { touching = false; }, 400); });
    map.on('click', e => { if (longPress) { longPress = false; return; } activate(pick(e.point)); });
  }

  /* ---------- Liste des départements (accès clavier / tactile) ---------- */
  function buildChips() {
    const box = $('.idf-depts'); if (!box || box.childElementCount) return;
    for (const [d, name] of Object.entries(depts)) {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'idf-dept-chip'; b.dataset.dept = d; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = `<b>${d}</b> `; b.append(name.replace(/'/g, '’'));
      b.addEventListener('click', () => go({ level: 1, dept: d }));
      box.append(b);
    }
  }

  /* ---------- Recherche ville (autocomplétion, 200 ms) ---------- */
  function search() {
    if (!input || input.dataset.ready) return; input.dataset.ready = '1';
    let items = [], active = -1, t = null;
    const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; };
    const choose = i => { const it = items[i]; if (!it) return; input.value = `${it.c.nom} (${it.cp})`; close(); go({ level: 2, dept: it.c.dept, city: it.c.code, cp: it.cp }); stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); };
    const mark = i => { active = i; [...list.children].forEach((li, k) => li.setAttribute('aria-selected', String(k === i))); if (i >= 0) input.setAttribute('aria-activedescendant', list.children[i].id); };
    function run() {
      const q = norm(input.value); items = [];
      if (q.length < 2) return close();
      const digits = q.replace(/\s/g, '');
      if (/^\d{2,5}$/.test(digits)) {
        for (const c of D.communes) { const cp = c.cp.find(x => x.startsWith(digits)); if (cp) items.push({ c, cp, s: c.pop }); }
      } else {
        for (const c of D.communes) {
          const i = c.n.indexOf(q); if (i < 0) continue;
          items.push({ c, cp: c.cp[0] || '', s: (i === 0 ? 1e9 : (c.n[i - 1] === ' ' ? 5e8 : 0)) + c.pop });
        }
      }
      items.sort((a, b) => b.s - a.s); items = items.slice(0, 8);
      list.replaceChildren(...items.map((it, k) => {
        const li = document.createElement('li'); li.id = `idf-opt-${k}`; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', 'false');
        li.innerHTML = '<span class="idf-opt-name"></span><span class="idf-opt-meta"></span>';
        li.firstChild.textContent = it.c.nom; li.lastChild.textContent = `${it.cp} · ${depts[it.c.dept]} (${it.c.dept})`;
        li.addEventListener('mousedown', e => { e.preventDefault(); choose(k); });
        return li;
      }));
      if (!items.length) { const li = document.createElement('li'); li.className = 'idf-empty'; li.textContent = 'Aucune commune d’Île-de-France ne correspond.'; list.append(li); }
      list.hidden = false; input.setAttribute('aria-expanded', 'true'); mark(items.length ? 0 : -1);
    }
    input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 200); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); mark((active + 1) % items.length); }
      else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); mark((active - 1 + items.length) % items.length); }
      else if (e.key === 'Enter') { e.preventDefault(); if (items.length) choose(active < 0 ? 0 : active); }
      else if (e.key === 'Escape') close();
    });
    input.addEventListener('blur', () => setTimeout(close, 120));
  }

  /* ---------- Démarrage ---------- */
  addEventListener('popstate', () => { if (!D) return; Object.assign(state, readUrl()); apply(true); });
  input && input.addEventListener('focus', () => ensureDeps().then(() => { if (!D) { prepareData(); search(); } }), { once: true });
  const wanted = new URLSearchParams(location.search).has('carte') || location.hash === '#carte';
  if (wanted || !('IntersectionObserver' in window)) start();
  else { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: '600px 0px' }); io.observe(root); }
})();
