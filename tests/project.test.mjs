import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { publishableProjects } from '../build.mjs';
import { serviceGallery } from '../src/templates.mjs';
const config=JSON.parse(fs.readFileSync(new URL('../data/site.json',import.meta.url)));
test('User-confirmed identity and contacts are copied exactly',()=>{
  assert.equal(config.brand,'GROUPE ATC');
  assert.equal(config.brandFull,'GROUPE ANELEC TECHNIQUE ET CONCEPTE');
  assert.equal(config.formerBrand,'ANELEC');
  assert.equal(config.domain,'anelecgroupe.com');
  assert.equal(config.email,'contact@anelecgroupe.com');
  assert.equal(config.phone,'+33184809385');
  assert.equal(config.address,'9 RUE DES COLONNES, 75002 PARIS');
});
test('No invented projects are published',()=>{
  assert.equal(config.features.projects,false);
  assert.deepEqual(JSON.parse(fs.readFileSync(new URL('../data/projects.json',import.meta.url))),[]);
  assert.deepEqual(publishableProjects([{approved:true}],true),[]);
  assert.deepEqual(publishableProjects([{approved:false,rightsConfirmed:true}],true),[]);
  assert.equal(fs.existsSync(new URL('../site/realisations.html',import.meta.url)),false);
});
test('A complete approved project remains hidden while feature is disabled',()=>{
  const p={slug:'real-project',title:'Validé',attribution:'GROUPE ATC',approved:true,rightsConfirmed:true,photos:[{src:'assets/approved.webp',alt:'Vue autorisée'}]};
  assert.equal(publishableProjects([p],false).length,0);
  assert.equal(publishableProjects([p],true).length,1);
});
test('Schedules are proposals, with explicit bounded time',()=>{
  assert.deepEqual(config.plans.map(p=>p.frequency),[2,4,12]);
  assert.ok(config.plans.every(p=>p.hoursPerVisit===2));
  assert.equal(config.publicationApproved,false);
  assert.equal(config.formMode,'local-summary');
});

test('Identité légale : même société, identifiants et dates distinctes',()=>{
  const legal=JSON.parse(fs.readFileSync('data/legal.json','utf8'));
  assert.equal(legal.registeredName,'GROUPE ATC');
  assert.equal(legal.sameLegalEntityAfterRename,true);
  assert.equal(legal.siren,'933108607');
  assert.equal(legal.headquartersSiret,'93310860700021');
  assert.equal(legal.vatNumber,'FR20933108607');
  assert.equal(legal.capitalEUR,3000);
  assert.equal(legal.president,'Najoua Boughrara');
  assert.equal(legal.sireneRegistrationDate,'2024-08-21');
  assert.equal(legal.rneRegistrationDate,'2024-11-08');
  assert.equal(legal.publicationDirector,null);
  const html=fs.readFileSync('site/informations.html','utf8');
  for(const value of ['933 108 607','933 108 607 00021','FR20933108607','3 000 €','Najoua Boughrara','21 août 2024','8 novembre 2024','même société','nouvelle présidence'])assert.ok(html.includes(value),value);
  assert.ok(html.includes(legal.sources.official));
  assert.doesNotMatch(html,/ne vaut pas preuve|SIREN.*reste à compléter/);
  const native=JSON.parse(fs.readFileSync('squarespace/native/company-profile.json','utf8'));
  assert.equal(native.publicLegal.rows.length,14);
  assert.equal(new Set(native.publicLegal.rows.flatMap(r=>[r.labelBlock,r.valueBlock])).size,28);
  assert.doesNotMatch(native.publicLegal.rows.map(r=>r.value).join(' '),/exemple|FRXX|12345|555555/i);
});

test('Plus de dix ans : expérience des techniciens et du directeur, non de la société',()=>{
  const statement='Nos techniciens et notre directeur de travaux disposent de plus de 10 ans d’expérience dans leur domaine.';
  assert.equal(config.teamExperienceStatement,statement);
  for(const file of ['site/index.html','site/groupe.html','squarespace/native/accueil.md','squarespace/native/groupe.md'])assert.ok(fs.readFileSync(file,'utf8').includes(statement),file);
  const native=JSON.parse(fs.readFileSync('squarespace/native/company-profile.json','utf8'));
  assert.ok(native.publicAbout.edits.some(e=>e.text.includes(statement)));
  assert.doesNotMatch(native.publicAbout.edits.map(e=>e.text).join(' '),/20 ans|ISO 9001/);
});

test('Rendered offers and native sources stay within the confirmed trade scope',()=>{
  const excluded=/\bcvc\b|chauffage|ventilation|climatis|nettoy|netyage|propret[eé]|g[eé]nie climatique|facility\s*management|d[eé]senfum|frigor|pompe [aà] chaleur/i;
  for(const page of ['index','maintenance','metiers','groupe','contact','informations']){
    assert.doesNotMatch(fs.readFileSync(`site/${page}.html`,'utf8'),excluded,`Unexpected trade in ${page}.html`);
  }
  for(const page of ['accueil','maintenance','metiers','groupe','contact','informations']){
    assert.doesNotMatch(fs.readFileSync(`squarespace/native/${page}.md`,'utf8'),excluded,`Unexpected trade in native ${page}`);
  }
  for(const file of ['squarespace/native/layout.json','squarespace/native/existing-services.json','squarespace/native/existing-services-maintenance.md','docs/offre-maintenance-proposee.md','docs/cahier-creation-squarespace.md']){
    assert.doesNotMatch(fs.readFileSync(file,'utf8'),excluded,`Unexpected trade in ${file}`);
  }
  const services=JSON.parse(fs.readFileSync('squarespace/native/existing-services.json','utf8'));
  assert.deepEqual(services.supportedTrades,['Plomberie','Électricité','Serrurerie','Rénovation intérieure','Maçonnerie','Menuiserie']);
  assert.equal(services.fields.length,30);
  assert.equal(services.cards.length,6);
  assert.ok(services.cards.every(c=>c.photo.nativeBlockEmpty===true));
  assert.equal(new Set(services.fields.map(f=>`${f.blockId}:${f.selector}:${f.index}`)).size,30);
  assert.doesNotMatch(services.fields.map(f=>f.text).join('\n'),/extension|autorisations administratives|contrat annuel/i);
});

test('les six métiers et leurs emplacements photo sont complets dans la page autonome', () => {
  const data=JSON.parse(fs.readFileSync(new URL('../data/services.json',import.meta.url),'utf8'));
  const html=fs.readFileSync(new URL('../site/metiers.html',import.meta.url),'utf8');
  assert.equal(data.families.length,6);
  assert.equal(data.families.reduce((n,f)=>n+f.items.length,0),17);
  for(const f of data.families){
    assert.ok(html.includes(`id="${f.id}"`));
    assert.ok(html.includes(`visuels/metier-${f.id}.webp`));
    assert.ok(html.includes('Visuel d’illustration'));
    for(const item of f.items)assert.ok(html.includes(item));
    fs.accessSync(new URL(`../site/assets/photo-${f.id}-a-ajouter.png`,import.meta.url));
  }
  assert.equal(data.photosAreClientReferences,false);
});

test('Carrousels : six galeries indépendantes et aucune photo non autorisée',()=>{
  const data=JSON.parse(fs.readFileSync('data/services.json','utf8'));
  const html=fs.readFileSync('site/metiers.html','utf8');
  assert.equal(data.gallery.mode,'carousel');
  assert.equal(data.gallery.autoplay,false);
  assert.equal(data.gallery.placeholderCount,3);
  assert.equal((html.match(/data-carousel /g)||[]).length,6);
  assert.ok(data.families.every(f=>Array.isArray(f.photos)&&f.photos.length===0));
  const family=data.families[0];
  const photo={src:'./assets/photo-plomberie-a-ajouter.png',alt:'Vue de test <non publiée>',caption:'Détail de test',approved:true,rightsConfirmed:true};
  const single=serviceGallery({...family,photos:[photo]});
  assert.ok(single.includes('Photo 1 / 1'));
  assert.ok(single.includes('disabled'));
  assert.ok(single.includes('Vue de test &lt;non publiée&gt;'));
  for(const rejected of [
    {...photo,approved:false},{...photo,rightsConfirmed:false},
    {...photo,alt:''},{...photo,src:'javascript:alert(1)'},
    {...photo,src:'https://example.invalid/non-autorisee.jpg'},
    {...photo,src:'./assets/../prive.jpg'}
  ]){
    const markup=serviceGallery({...family,photos:[rejected]});
    assert.ok(markup.includes('Visuel 1 / 1')&&markup.includes('Visuel d’illustration')&&!markup.includes('non-autorisee'));
  }
  assert.ok(serviceGallery({...family,photos:[photo,photo]}).includes('Photo 1 / 2'));
});

test('Carte interactive : composant, données locales et pré-remplissage du devis', () => {
  const home=fs.readFileSync(new URL('../site/index.html',import.meta.url),'utf8');
  assert.ok(home.includes('data-idf-map')&&home.includes('id="carte"')&&home.includes('/assets/carte/carte.js'));
  assert.ok(home.includes('placeholder="Rechercher une ville… (ex. Créteil, 94000)"'));
  assert.ok(home.includes('idf-fallback'),'le SVG statique reste en repli');
  assert.ok(!/fonts\.googleapis|api\.fontshare/.test(home));
  const data=fs.readFileSync(new URL('../site/assets/carte/donnees-idf.js',import.meta.url),'utf8');
  for(const d of ['75','77','78','91','92','93','94','95'])assert.ok(data.includes(`"${d}"`));
  assert.ok(data.includes('"Créteil"'));
  const contact=fs.readFileSync(new URL('../site/contact.html',import.meta.url),'utf8');
  assert.ok(contact.includes('id="city-chosen"'));
  const app=fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
  assert.ok(app.includes('Intervention demandée pour la commune de')&&app.includes("city.readOnly=true"));
});

test('Contact : champs entreprise et SIRET pour les professionnels', () => {
  const contact=fs.readFileSync(new URL('../site/contact.html',import.meta.url),'utf8');
  assert.ok(contact.includes('id="pro-fields"')&&contact.includes('id="siret"')&&contact.includes('name="entreprise"'));
  const app=fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
  assert.ok(app.includes('siretValid')&&app.includes("profile.value==='Professionnel'"));
});
