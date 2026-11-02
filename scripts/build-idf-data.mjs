// Données de la carte interactive Île-de-France (site/assets/carte/).
// Sources : geo.api.gouv.fr (COG INSEE / IGN Admin Express) — communes, centres, codes postaux, population.
// Paris est détaillé par arrondissement municipal. Contours simplifiés avec mapshaper.
// Usage : node scripts/build-idf-data.mjs
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const OUT = 'site/assets/carte', TMP = fs.mkdtempSync('/tmp/idf-');
fs.mkdirSync(OUT, { recursive: true });
const DEPTS = { '75':'Paris','77':'Seine-et-Marne','78':'Yvelines','91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis','94':'Val-de-Marne','95':"Val-d'Oise" };
const api = async u => { for (let i=0;i<4;i++){ const r = await fetch('https://geo.api.gouv.fr'+u); if (r.ok) return r.json(); await new Promise(s=>setTimeout(s,800)); } throw new Error(u); };
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const fields = 'nom,code,codesPostaux,population,centre,codeDepartement';
const communes = [], shapes = [];
for (const d of Object.keys(DEPTS)) {
  const q = d==='75' ? `/communes?codeDepartement=75&type=arrondissement-municipal` : `/departements/${d}/communes?`;
  const list = await api(`${q}&fields=${fields}&format=json`);
  const geo = await api(`${q}&fields=code&format=geojson&geometry=contour`);
  for (const c of list) communes.push({ code:c.code, nom:c.nom.replace(/ Arrondissement$/,''), cp:c.codesPostaux||[], pop:c.population||0, dept:d, deptName:DEPTS[d], lon:c.centre.coordinates[0], lat:c.centre.coordinates[1] });
  shapes.push(...geo.features);
  console.log(d, list.length);
}
communes.sort((a,b)=>a.nom.localeCompare(b.nom,'fr'));
// Contours des communes, simplifiés
const byCode = Object.fromEntries(communes.map(c=>[c.code,c]));
const raw = { type:'FeatureCollection', features: shapes.map(f=>{ const c=byCode[f.properties.code]; return { type:'Feature', properties:{ code:c.code, dept:c.dept }, geometry:f.geometry }; }) };
fs.writeFileSync(`${TMP}/communes.json`, JSON.stringify(raw));
const ms = (args) => execFileSync('node_modules/.bin/mapshaper', args, { stdio:['ignore','pipe','inherit'] });
ms([`${TMP}/communes.json`, '-simplify', 'dp', '3%', 'keep-shapes', '-clean', '-o', `${OUT}/communes-idf.geojson`, 'precision=0.0002', 'format=geojson']);
// Départements = fusion des communes ; région = fusion des départements
ms([`${TMP}/communes.json`, '-dissolve', 'dept', '-simplify', 'dp', '8%', 'keep-shapes', '-each', `name=({'75':'Paris','77':'Seine-et-Marne','78':'Yvelines','91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis','94':'Val-de-Marne','95':"Val-d'Oise"})[dept]`, '-o', `${OUT}/departements-idf.geojson`, 'precision=0.0001', 'format=geojson']);
ms([`${OUT}/departements-idf.geojson`, '-dissolve', '-o', `${OUT}/region-idf.geojson`, 'precision=0.0001', 'format=geojson']);
// Points de label des départements (point intérieur)
ms([`${OUT}/departements-idf.geojson`, '-points', 'inner', '-o', `${OUT}/departements-labels.geojson`, 'precision=0.0001', 'format=geojson']);
fs.writeFileSync(`${OUT}/communes-idf.json`, JSON.stringify({ source:'geo.api.gouv.fr (INSEE COG, IGN) — '+new Date().toISOString().slice(0,10), departements:DEPTS, communes }));
// Fichier unique chargé par <script> (fonctionne aussi en ouvrant le site en local, sans serveur)
const read = f => JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8'));
const bundle = { source:'geo.api.gouv.fr (INSEE COG, IGN Admin Express)', date:new Date().toISOString().slice(0,10), departements:DEPTS,
  region:read('region-idf.geojson'), depts:read('departements-idf.geojson'), deptLabels:read('departements-labels.geojson'),
  communesGeo:read('communes-idf.geojson'), communes };
fs.writeFileSync(`${OUT}/donnees-idf.js`, `/* Données Île-de-France — ${bundle.source}, ${bundle.date}. Généré par scripts/build-idf-data.mjs */\nwindow.GROUPE_ATC_IDF=${JSON.stringify(bundle)};\n`);
for (const f of ['region-idf.geojson','departements-idf.geojson','departements-labels.geojson','communes-idf.geojson','communes-idf.json']) fs.rmSync(`${OUT}/${f}`);
for (const f of fs.readdirSync(OUT)) console.log(f, Math.round(fs.statSync(path.join(OUT,f)).size/1024)+' Ko');
console.log('communes', communes.length);
