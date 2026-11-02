const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Ouvrir le menu')}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.matchMedia('(min-width: 901px)').addEventListener('change',closeMenu);
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
function showUnavailableImage(img){
  if(!img.isConnected)return;
  const figure=img.closest('figure');
  if(!figure)return;
  figure.style.minHeight='16rem';
  img.remove();
  const p=document.createElement('p');
  p.textContent='Le visuel est temporairement indisponible.';
  p.style.padding='2rem';
  figure.prepend(p);
}
document.querySelectorAll('.photo img').forEach(img=>{
  img.addEventListener('error',()=>showUnavailableImage(img),{once:true});
  if(img.complete&&img.naturalWidth===0)showUnavailableImage(img);
});

document.querySelectorAll('[data-carousel]').forEach(gallery=>{
  let frames;
  try{frames=JSON.parse(gallery.dataset.frames)}catch{return}
  if(!Array.isArray(frames)||!frames.length)return;
  const img=gallery.querySelector('img'),counter=gallery.querySelector('.carousel-counter');
  const caption=gallery.querySelector('.carousel-caption'),error=gallery.querySelector('.carousel-error');
  const controls=gallery.querySelector('.carousel-controls'),viewport=gallery.querySelector('.carousel-viewport');
  if(!img||!counter||!controls||!viewport)return;
  let index=0,start=null;
  const placeholder=gallery.dataset.placeholder==='true';
  function show(next){
    index=(next+frames.length)%frames.length;
    gallery.dataset.index=String(index);
    if(error)error.hidden=true;
    img.hidden=false;
    img.alt=frames[index].alt;
    img.src=frames[index].src;
    counter.textContent=`${placeholder?'Visuel':'Photo'} ${index+1} / ${frames.length}`;
    counter.hidden=placeholder;
    if(caption)caption.textContent=frames[index].caption||'';
    if(img.complete&&img.naturalWidth===0)failed();
  }
  function failed(){img.hidden=true;if(error)error.hidden=false}
  img.addEventListener('error',failed);
  img.addEventListener('load',()=>{img.hidden=false;if(error)error.hidden=true});
  if(img.complete&&img.naturalWidth===0)failed();
  controls.querySelectorAll('[data-direction]').forEach(button=>{
    button.disabled=frames.length<2;
    button.addEventListener('click',()=>show(index+Number(button.dataset.direction)));
  });
  gallery.addEventListener('keydown',event=>{
    const targets={ArrowLeft:index-1,ArrowRight:index+1,Home:0,End:frames.length-1};
    if(Object.hasOwn(targets,event.key)){event.preventDefault();show(targets[event.key])}
  });
  viewport.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse')return;
    start={x:event.clientX,y:event.clientY,id:event.pointerId};
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener('pointerup',event=>{
    if(!start||start.id!==event.pointerId)return;
    const dx=event.clientX-start.x,dy=event.clientY-start.y;
    start=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)show(index+(dx<0?1:-1));
  });
  viewport.addEventListener('pointercancel',()=>{start=null});
  show(0);
  controls.hidden=false;
});

const form=document.querySelector('#request-form');
if(form){
  const query=new URLSearchParams(location.search);
  const need=document.querySelector('#need');
  const trade=document.querySelector('#trade');
  const plan=document.querySelector('#plan');
  const knownPlans=['Essentiel','Suivi','Continuité'];
  function applySelect(el,value){if([...el.options].some(o=>o.value===value))el.value=value}
  applySelect(need,query.get('besoin'));applySelect(trade,query.get('metier'));applySelect(plan,query.get('formule'));
  if(knownPlans.includes(query.get('formule')))need.value='Maintenance';
  // Ville choisie sur la carte : commune pré-remplie et verrouillée
  const city=document.querySelector('#city'),description=document.querySelector('#description');
  const depts={'75':'Paris','77':'Seine-et-Marne','78':'Yvelines','91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis','94':'Val-de-Marne','95':"Val-d'Oise"};
  const ville=(query.get('ville')||'').trim().slice(0,80),code=query.get('code')||'',dept=query.get('dept')||'',insee=query.get('insee')||'';
  let chosenCity='';
  if(ville&&/^\d{5}$/.test(code)&&depts[dept]&&!/[<>]/.test(ville)){
    const deptName=depts[dept];
    chosenCity=`${ville} (${code}) — ${deptName} (${dept})`;
    city.value=`${ville} (${code})`;city.readOnly=true;city.setAttribute('aria-readonly','true');
    if(!description.value)description.value=`Intervention demandée pour la commune de ${ville} (${code}), ${deptName}. `;
    if(!query.get('besoin'))applySelect(need,'Travaux');
    const box=document.querySelector('#city-chosen');box.hidden=false;document.querySelector('#city-chosen-name').textContent=`${ville} (${code}) — ${deptName}`;
    const back=document.querySelector('#city-change');
    if(/^\d{5}$/.test(insee))back.href=back.getAttribute('href').replace('#carte',`?carte=${dept}&ville=${insee}&cp=${code}#carte`);
    setTimeout(()=>{(trade.value?description:trade).focus()},0);
  }
  function planVisibility(){document.querySelector('#plan-field').hidden=need.value!=='Maintenance'}
  planVisibility();need.addEventListener('change',planVisibility);
  // Étape 2 : entreprise et SIRET demandés uniquement pour un professionnel
  const profile=document.querySelector('#profile'),proFields=document.querySelector('#pro-fields'),siret=document.querySelector('#siret'),company=document.querySelector('#company');
  function siretValid(v){const n=v.replace(/\s/g,'');if(!/^\d{14}$/.test(n))return false;if(n.startsWith('356000000'))return [...n].reduce((s,c)=>s+ +c,0)%5===0;let s=0;for(let i=0;i<14;i++){let x=+n[13-i];if(i%2){x*=2;if(x>9)x-=9}s+=x}return s%10===0}
  function proVisibility(){const pro=profile.value==='Professionnel';proFields.hidden=!pro;[siret,company].forEach(el=>{el.required=pro;el.disabled=!pro;if(!pro){el.removeAttribute('aria-invalid');const e=el.closest('.field').querySelector('.field-error');if(e)e.textContent=''}})}
  applySelect(profile,query.get('profil'));
  proVisibility();profile.addEventListener('change',proVisibility);
  siret.addEventListener('input',()=>{const n=siret.value.replace(/\D/g,'').slice(0,14);siret.value=n.replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,5}).*/,(m,a,b,c,d)=>[a,b,c,d].filter(Boolean).join(' '));siret.setCustomValidity(n.length===14&&!siretValid(n)?'invalid':'')});
  let step=1;
  function showStep(n){step=n;form.querySelectorAll('.form-step').forEach(el=>el.hidden=el.dataset.step!==String(n));form.querySelector('.form-progress').textContent=n===1?'Étape 1 / 2 · Votre besoin':'Étape 2 / 2 · Vos coordonnées';form.querySelector(`[data-step="${n}"] input, [data-step="${n}"] select`)?.focus()}
  function validate(section){let valid=true;section.querySelectorAll('[required]').forEach(el=>{if(el.disabled)return;const message=!el.value.trim()?'Ce champ est nécessaire.':!el.validity.valid?(el.dataset.error||'Vérifiez le format de votre courriel.'):'';el.setAttribute('aria-invalid',String(Boolean(message)));const error=el.closest('.field').querySelector('.field-error');if(error)error.textContent=message;if(message)valid=false});if(!valid)section.querySelector('[aria-invalid="true"]')?.focus();return valid}
  document.querySelector('#next-step').addEventListener('click',()=>{if(validate(form.querySelector('[data-step="1"]')))showStep(2)});
  document.querySelector('#previous-step').addEventListener('click',()=>showStep(1));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(step!==2){document.querySelector('#next-step').click();return}
    if(!validate(form.querySelector('[data-step="1"]'))){showStep(1);return}
    if(!validate(form.querySelector('[data-step="2"]')))return;
    const d=new FormData(form);
    const text=`Bonjour GROUPE ATC,\n\nJe souhaite étudier la demande suivante.\n\nBesoin : ${d.get('besoin')}\nMétier : ${d.get('metier')}\nCommune : ${d.get('commune')}\n${chosenCity?`Ville sélectionnée sur la carte : ${chosenCity}\n`:''}${need.value==='Maintenance'&&d.get('formule')?`Formule à étudier : ${d.get('formule')}\n`:''}Description : ${d.get('description')}\n\nProfil : ${d.get('profil')}\n${profile.value==='Professionnel'?`Entreprise : ${d.get('entreprise')}\nSIRET : ${d.get('siret')}\n`:''}Nom : ${d.get('nom')}\nCourriel : ${d.get('courriel')}\nTéléphone : ${d.get('telephone')||'Non renseigné'}\n\nMerci.`;
    document.querySelector('#summary-text').value=text;
    const link=document.querySelector('#email-request');
    const recipient=link.getAttribute('href').split('?')[0];
    link.setAttribute('href',recipient+'?subject='+encodeURIComponent('Demande GROUPE ATC : '+d.get('besoin'))+'&body='+encodeURIComponent(text));
    form.hidden=true;const summary=document.querySelector('#request-summary');summary.hidden=false;summary.focus();
  });
  document.querySelector('#edit-request').addEventListener('click',()=>{document.querySelector('#request-summary').hidden=true;form.hidden=false;showStep(2)});
  document.querySelector('#copy-request').addEventListener('click',async()=>{const field=document.querySelector('#summary-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#copy-status').textContent='Texte copié. Aucun message n’a été envoyé.'}catch{field.focus();field.select();document.querySelector('#copy-status').textContent='Sélectionnez puis copiez ce texte avec votre appareil.'}});
}

/* --- Apparition au défilement (le contenu reste visible sans JavaScript) --- */
document.documentElement.classList.add('js');
(()=>{
  const items=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){items.forEach(el=>el.classList.add('is-visible'));return}
  const show=el=>{el.classList.add('is-visible');io.unobserve(el)};
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting||e.boundingClientRect.top<0)show(e.target)}),{rootMargin:'0px 0px -5% 0px',threshold:0});
  // Filet de sécurité : rien ne reste caché (ancre, impression, défilement rapide)
  const revealPassed=()=>items.forEach(el=>{if(!el.classList.contains('is-visible')&&el.getBoundingClientRect().top<innerHeight)show(el)});
  addEventListener('scroll',revealPassed,{passive:true});addEventListener('hashchange',revealPassed);addEventListener('beforeprint',()=>items.forEach(show));
  setTimeout(revealPassed,300);
  items.forEach((el,i)=>{el.style.transitionDelay=`${(i%4)*70}ms`;io.observe(el)});
})();

/* --- Curseur « Nos métiers » (défilement horizontal sur tablette et mobile) --- */
(()=>{
  const track=document.querySelector('#trade-track');
  if(!track)return;
  const prev=document.querySelector('[data-slide="-1"]'),next=document.querySelector('[data-slide="1"]');
  const dotsBox=document.querySelector('.slider-dots');
  const cards=[...track.children];
  const dots=cards.map(()=>{const s=document.createElement('span');dotsBox?.append(s);return s});
  const step=()=>cards[0]?(cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||16)):track.clientWidth;
  const update=()=>{
    const max=track.scrollWidth-track.clientWidth-2;
    if(prev)prev.disabled=track.scrollLeft<=2;
    if(next)next.disabled=track.scrollLeft>=max;
    const idx=Math.min(cards.length-1,Math.round(track.scrollLeft/step()));
    dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
  };
  [prev,next].forEach(b=>b?.addEventListener('click',()=>track.scrollBy({left:Number(b.dataset.slide)*step(),behavior:'smooth'})));
  track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
  window.addEventListener('resize',update);
  update();
})();
