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
    assert.ok(html.includes(`photo-${f.id}-a-ajouter.png`));
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
    assert.ok(markup.includes('Emplacement 1 / 3'));
  }
  assert.ok(serviceGallery({...family,photos:[photo,photo]}).includes('Photo 1 / 2'));
});
