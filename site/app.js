const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Ouvrir le menu')}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.matchMedia('(min-width: 861px)').addEventListener('change',closeMenu);
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
    counter.textContent=`${placeholder?'Emplacement':'Photo'} ${index+1} / ${frames.length}`;
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
  function planVisibility(){document.querySelector('#plan-field').hidden=need.value!=='Maintenance'}
  planVisibility();need.addEventListener('change',planVisibility);
  let step=1;
  function showStep(n){step=n;form.querySelectorAll('.form-step').forEach(el=>el.hidden=el.dataset.step!==String(n));form.querySelector('.form-progress').textContent=n===1?'Étape 1 / 2 · Votre besoin':'Étape 2 / 2 · Vos coordonnées';form.querySelector(`[data-step="${n}"] input, [data-step="${n}"] select`)?.focus()}
  function validate(section){let valid=true;section.querySelectorAll('[required]').forEach(el=>{const message=!el.value.trim()?'Ce champ est nécessaire.':!el.validity.valid?'Vérifiez le format de votre courriel.':'';el.setAttribute('aria-invalid',String(Boolean(message)));const error=el.closest('.field').querySelector('.field-error');if(error)error.textContent=message;if(message)valid=false});if(!valid)section.querySelector('[aria-invalid="true"]')?.focus();return valid}
  document.querySelector('#next-step').addEventListener('click',()=>{if(validate(form.querySelector('[data-step="1"]')))showStep(2)});
  document.querySelector('#previous-step').addEventListener('click',()=>showStep(1));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(step!==2){document.querySelector('#next-step').click();return}
    if(!validate(form.querySelector('[data-step="1"]'))){showStep(1);return}
    if(!validate(form.querySelector('[data-step="2"]')))return;
    const d=new FormData(form);
    const text=`Bonjour GROUPE ATC,\n\nJe souhaite étudier la demande suivante.\n\nBesoin : ${d.get('besoin')}\nMétier : ${d.get('metier')}\nCommune : ${d.get('commune')}\n${need.value==='Maintenance'&&d.get('formule')?`Formule à étudier : ${d.get('formule')}\n`:''}Description : ${d.get('description')}\n\nProfil : ${d.get('profil')}\nNom : ${d.get('nom')}\nCourriel : ${d.get('courriel')}\nTéléphone : ${d.get('telephone')||'Non renseigné'}\n\nMerci.`;
    document.querySelector('#summary-text').value=text;
    const link=document.querySelector('#email-request');
    const recipient=link.getAttribute('href').split('?')[0];
    link.setAttribute('href',recipient+'?subject='+encodeURIComponent('Demande GROUPE ATC : '+d.get('besoin'))+'&body='+encodeURIComponent(text));
    form.hidden=true;const summary=document.querySelector('#request-summary');summary.hidden=false;summary.focus();
  });
  document.querySelector('#edit-request').addEventListener('click',()=>{document.querySelector('#request-summary').hidden=true;form.hidden=false;showStep(2)});
  document.querySelector('#copy-request').addEventListener('click',async()=>{const field=document.querySelector('#summary-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#copy-status').textContent='Texte copié. Aucun message n’a été envoyé.'}catch{field.focus();field.select();document.querySelector('#copy-status').textContent='Sélectionnez puis copiez ce texte avec votre appareil.'}});
}
