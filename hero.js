// Bandeau d'accueil : boucle de six métiers (vidéo si le fichier existe, sinon photo).
(() => {
  const hero = document.querySelector('.atc-hero');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.atc-slide')];
  const tabs = [...hero.querySelectorAll('.atc-trade')];
  const pauseBtn = hero.querySelector('.atc-pause');
  const DURATION = 4000;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, timer = null, paused = reduced;

  const prepare = (i) => {
    const v = slides[i].querySelector('video');
    if (!v || v.dataset.ready) return;
    v.dataset.ready = '1';
    v.addEventListener('error', () => v.remove(), { once: true });
    v.addEventListener('playing', () => slides[i].classList.add('has-video'), { once: true });
    v.src = v.dataset.src;
  };
  const show = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === current;
      s.classList.toggle('is-active', on);
      const v = s.querySelector('video');
      if (v) { if (on) { prepare(k); v.currentTime = 0; v.play().catch(() => {}); } else v.pause(); }
    });
    tabs.forEach((t, k) => {
      t.classList.toggle('is-active', k === current);
      t.setAttribute('aria-current', k === current ? 'true' : 'false');
      const bar = t.querySelector('i');
      bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    });
    prepare((current + 1) % slides.length);
    clearTimeout(timer);
    if (!paused) timer = setTimeout(() => show(current + 1), DURATION);
  };
  tabs.forEach((t, k) => t.addEventListener('click', () => show(k)));
  const setPaused = (p) => {
    paused = p;
    hero.classList.toggle('is-paused', p);
    pauseBtn.setAttribute('aria-label', p ? 'Reprendre la vidéo' : 'Mettre la vidéo en pause');
    pauseBtn.classList.toggle('on', p);
    slides[current].querySelector('video')?.[p ? 'pause' : 'play']?.()?.catch?.(() => {});
    clearTimeout(timer);
    if (!p) timer = setTimeout(() => show(current + 1), DURATION);
  };
  pauseBtn.addEventListener('click', () => setPaused(!paused));
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(timer); else if (!paused) show(current); });
  hero.classList.toggle('is-paused', paused);
  show(0);
})();
