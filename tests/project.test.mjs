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
  assert.equal(config.publicationApproved,true);
  assert.equal(config.formMode,'email');
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
  assert.equal(legal.publicationDirector.name,legal.president);
  const html=fs.readFileSync('site/informations.html','utf8');
  for(const value of ['933 108 607','933 108 607 00021','FR20933108607','3 000 €','Najoua Boughrara','21 août 2024','8 novembre 2024','même société','nouvelle présidence'])assert.ok(html.includes(value),value);
  assert.ok(html.includes(legal.sources.official));
  assert.doesNotMatch(html,/ne vaut pas preuve|SIREN.*reste à compléter/);
  const native=JSON.parse(fs.readFileSync('squarespace/native/company-profile.json','utf8'));
  assert.equal(native.publicLegal.rows.length,14);
  assert.equal(new Set(native.publicLegal.rows.flatMap(r=>[r.labelBlock,r.valueBlock])).size,28);
  assert.doesNotMatch(native.publicLegal.rows.map(r=>r.value).join(' '),/exemple|FRXX|12345|555555/i);
});

test('Expérience : directeur des travaux +15 ans, techniciens +10 ans (personnes, non société)',()=>{
  const statement='Notre directeur des travaux cumule plus de 15 ans d’expérience, et chacun de nos techniciens plus de 10 ans dans son métier.';
  assert.equal(config.teamExperienceStatement,statement);
  for(const file of ['site/index.html','site/groupe.html','squarespace/native/accueil.md','squarespace/native/groupe.md'])assert.ok(fs.readFileSync(file,'utf8').includes(statement),file);
  const native=JSON.parse(fs.readFileSync('squarespace/native/company-profile.json','utf8'));
  assert.ok(native.publicAbout.edits.some(e=>e.text.includes(statement)));
  assert.doesNotMatch(native.publicAbout.edits.map(e=>e.text).join(' '),/20 ans|ISO 9001/);
});

test('Rendered offers and native sources stay within the confirmed trade scope',()=>{
  const excluded=/\bcvc\b|chauffage|ventilation|climatis|nettoy|netyage|propret[eé]|g[eé]nie climatique|facility\s*management|d[eé]senfum|frigor|pompe [aà] chaleur/i;
  for(const page of ['index','maintenance','metiers','partenariat','groupe','contact','informations']){
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

test('SEO : données structurées, B2B/B2C, robots et llms.txt', async () => {
  const { robotsTxt, llmsTxt, sitemapXml } = await import('../src/seo.mjs');
  const pagesHtml=['index.html','metiers.html','maintenance.html','contact.html','groupe.html','informations.html'];
  for(const f of pagesHtml){
    const h=fs.readFileSync(new URL('../site/'+f,import.meta.url),'utf8');
    const m=h.match(/<script type="application\/ld\+json">(.*?)<\/script>/);assert.ok(m,f+' sans JSON-LD');
    const g=JSON.parse(m[1])['@graph'];
    assert.ok(g.some(n=>[].concat(n['@type']).includes('HomeAndConstructionBusiness')));
    assert.ok(!JSON.stringify(g).match(/aggregateRating|review|priceRange|openingHours/),'aucune donnée inventée');
    const title=h.match(/<title>(.*?)<\/title>/)[1];assert.ok(title.length<=70,f+' titre trop long');
    const d=h.match(/name="description" content="(.*?)"/)[1];assert.ok(d.length>=110&&d.length<=160,f+' description '+d.length);
    assert.equal((h.match(/<h1[\s>]/g)||[]).length,1);
    if(!config.publicationApproved)assert.ok(h.includes('noindex,nofollow'));
  }
  const home=fs.readFileSync(new URL('../site/index.html',import.meta.url),'utf8');
  assert.ok(home.includes('id="clientele"')&&home.includes('B2B')&&home.includes('B2C'));
  const maint=fs.readFileSync(new URL('../site/maintenance.html',import.meta.url),'utf8');assert.ok(maint.includes('"FAQPage"'));
  assert.match(robotsTxt({...config,publicationApproved:false}),/Disallow: \//);
  const pub=robotsTxt({...config,publicationApproved:true});
  assert.ok(pub.includes('GPTBot')&&pub.includes('PerplexityBot')&&pub.includes('Sitemap: https://anelecgroupe.com/sitemap.xml'));
  assert.ok(llmsTxt(config,[{file:'index.html',title:'A',description:'B'}]).includes('B2B'));
  assert.ok(sitemapXml(['https://anelecgroupe.com/'],'2026-11-02').includes('<lastmod>2026-11-02</lastmod>'));
});

test('Formulaire : case « Intervention urgente » et option Partenariat',()=>{
  const html=fs.readFileSync('site/contact.html','utf8');
  assert.match(html,/<input type="checkbox" id="urgent" name="urgence" value="Oui"/);
  assert.match(html,/id="urgent-note"[^>]*hidden/);
  assert.match(html,/<option value="Partenariat">/);
  const js=fs.readFileSync('site/app.js','utf8');
  assert.match(js,/Urgence : \$\{urgent\.checked\?'Oui':'Non'\}/);
  assert.match(js,/'URGENT – '/);
});

test('Page Partenariat B2B : expérience confirmée, navigation et SEO',()=>{
  const html=fs.readFileSync('site/partenariat.html','utf8');
  for(const s of ['+15 ans','+10 ans','6 techniciens, 4 administratifs','Contrat cadre multi-sites','Assurance décennale','Références anonymisées','besoin=Partenariat&amp;profil=Professionnel'])assert.ok(html.includes(s),s);
  assert.doesNotMatch(html,/42 €|40 €|€ HT/,'Tarifs à ne pas publier');
  for(const s of ['+1 200','6j/7','moins de 48 h'])assert.ok(html.includes(s),s);
  for(const page of ['index','contact','metiers'])assert.ok(fs.readFileSync(`site/${page}.html`,'utf8').includes('href="/partenariat.html"'),page);
  assert.ok(fs.readFileSync('site/llms.txt','utf8').includes('/partenariat.html'));
});

test('Mentions légales : page dédiée, liens sur toutes les pages, éléments LCEN',()=>{
  const html=fs.readFileSync('site/mentions-legales.html','utf8');
  for(const s of ['Éditeur du site','Directrice de la publication','Najoua Boughrara','HOSTINGER INTERNATIONAL LIMITED','61 Lordou Vironos','HE 301365','933 108 607 RCS Paris','FR20933108607','Médiation de la consommation','Données personnelles','CNIL','aucun cookie','OpenStreetMap'])assert.ok(html.includes(s),s);
  for(const page of ['index','maintenance','metiers','partenariat','groupe','contact','informations','404'])assert.ok(fs.readFileSync(`site/${page}.html`,'utf8').includes('href="/mentions-legales.html"'),page);
  assert.ok(!fs.readFileSync('site/informations.html','utf8').includes('Mentions restant à finaliser'));
});

test('Formulaire : envoi automatique vers contact@ via SMTP Zoho, sans secret dans le dépôt', async () => {
  const { readFile } = await import('node:fs/promises');
  const php = await readFile(new URL('../site/api/demande.php', import.meta.url), 'utf8');
  const js = await readFile(new URL('../site/app.js', import.meta.url), 'utf8');
  const contact = await readFile(new URL('../site/contact.html', import.meta.url), 'utf8');
  assert.match(php, /smtppro\.zoho\.eu/);
  assert.match(php, /atc-mail-config\.php/);
  assert.match(php, /dirname\(__DIR__, 2\)/);
  assert.match(php, /URGENT – /);
  assert.match(php, /site_web/);
  assert.doesNotMatch(php, /'password'\s*=>\s*'[^C]/);
  assert.match(js, /\/api\/demande\.php/);
  assert.match(contact, /id="request-sent"/);
  assert.match(contact, /name="site_web"/);
  const ignore = await readFile(new URL('../.gitignore', import.meta.url), 'utf8');
  assert.match(ignore, /atc-mail-config\.php/);
});
