const fs = await import('node:fs/promises');
const {default:assert} = await import('node:assert/strict');

export async function runPreviewQA(browser, base='http://127.0.0.1:3000/') {
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const result={base:base.startsWith('http://127.0.0.1:')?base:'hosted-private-preview',pages:[],flows:[],errors};
  const directory='/home/user/workspace/groupe-atc-site/docs/screenshots';
  await fs.mkdir(directory,{recursive:true});
  const url=file=>new URL(file,base).href;
  for(const width of [1440,375]) {
    await page.setViewportSize({width,height:width===375?812:1000});
    for(const file of ['index','maintenance','metiers','groupe','contact','informations']) {
      await page.goto(url(`${file}.html`));
      await page.evaluate(()=>document.fonts.ready);
      for(const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(e=>e.decode());
      }
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      const state=await page.evaluate(()=>({
        h1:document.querySelectorAll('h1').length,
        overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,
        wrongEmail:document.body.textContent.includes('contact@aneleggroupe.com'),
        email:[...document.querySelectorAll('a[href^="mailto:"]')].map(e=>e.getAttribute('href').split('?')[0]),
        brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length
      }));
      assert.equal(state.h1,1);assert.equal(state.overflow,false);assert.equal(state.wrongEmail,false);assert.equal(state.brokenImages,0);
      assert.ok(state.email.length>0&&state.email.every(v=>v==='mailto:contact@anelecgroupe.com'));
      const logos=page.locator('.brand-logo');
      assert.equal(await logos.count(),2);
      for(const logo of await logos.all()){
        assert.equal(await logo.getAttribute('alt'),'GROUPE ATC');
        assert.equal(await logo.getAttribute('src'),'./assets/groupe-atc-logo.svg');
        const dimensions=await logo.evaluate(e=>({width:e.clientWidth,height:e.clientHeight}));
        assert.ok(Math.abs(dimensions.width/dimensions.height-4.2)<.12,'Undistorted logo');
        assert.ok(dimensions.width>=190&&dimensions.width<=240,'Readable responsive logo');
      }
      assert.equal(await page.locator('img[src*="anelec-original"]').count(),0);
      if(file==='index'&&width===1440)result.flows.push('Logo GROUPE ATC chargé dans les six en-têtes et pieds de page, lisible et non déformé aux deux largeurs.');
      if(file==='informations'){
        const text=await page.locator('main').innerText();
        for(const value of ['933 108 607 00021','FR20933108607','3 000 €','Najoua Boughrara','21 août 2024','8 novembre 2024','même société','nouvelle présidence'])assert.ok(text.includes(value),value);
        assert.equal(await page.locator('.company-identification>div').count(),13);
        assert.equal(await page.getByRole('link',{name:'l’Annuaire des Entreprises',exact:true}).getAttribute('href'),'https://annuaire-entreprises.data.gouv.fr/entreprise/933108607');
        if(width===1440)result.flows.push('Identité légale complète, dates Sirene/RNE distinctes et référence officielle.');
      }
      if(['index','groupe'].includes(file)){
        const text=await page.locator('main').innerText();
        assert.ok(text.includes('Nos techniciens et notre directeur de travaux disposent de plus de 10 ans d’expérience dans leur domaine.'));
        if(file==='groupe'){assert.ok(text.includes('la même société'));assert.ok(text.includes('nouvelle présidence'))}
        if(width===1440)result.flows.push(`${file==='index'?'Accueil':'Groupe'} : expérience des personnes et contenu confirmé.`);
      }
      result.pages.push({file,width,...state});
      if(file==='metiers'){
        const cards=await page.locator('.service-card').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y}}));
        assert.equal(cards.length,6);
        if(width===1440){
          assert.ok(Math.abs(cards[0].y-cards[2].y)<1);
          assert.ok(Math.abs(cards[3].y-cards[5].y)<1);
          assert.ok(cards[3].y>cards[0].y);
          assert.ok(cards[0].x<cards[1].x&&cards[1].x<cards[2].x);
        }else assert.ok(cards.every(c=>Math.abs(c.x-cards[0].x)<1));
        result.flows.push(`Six services et six galeries : ${width===1440?'trois colonnes, deux rangées':'une colonne mobile'}.`);
      }
      await page.screenshot({path:`${directory}/updated-${file}-${width}.png`,fullPage:true});
    }
  }
  const serviceFamilies=JSON.parse(await fs.readFile('/home/user/workspace/groupe-atc-site/data/services.json','utf8')).families;
  await page.setViewportSize({width:1440,height:1000});
  for(const f of serviceFamilies){
    await page.goto(url('metiers.html'));
    await page.locator(`#${f.id}`).getByRole('link',{name:'Décrire mon besoin'}).click();
    await page.waitForLoadState('load');
    await page.waitForFunction(value=>document.querySelector('#trade')?.value===value,f.formValue);
    assert.equal(await page.locator('#trade').inputValue(),f.formValue);
    assert.equal(await page.locator('#need').inputValue(),'Travaux');
  }
  result.flows.push('Les six liens métier préremplissent le contact avec la bonne prestation.');
  result.carousel=await runCarouselQA(browser,base);
  result.flows.push('Six carrousels : flèches, boucle, indépendance, clavier, tactile et replis.');
  await page.goto(url('groupe.html'));
  await page.locator('.site-header .brand').click();
  await page.waitForURL(url('index.html'));
  await page.locator('.site-footer .brand').click();
  await page.waitForURL(url('index.html'));
  result.flows.push('Les logos de l’en-tête et du pied de page ramènent à l’accueil.');
  await page.setViewportSize({width:375,height:812});
  await page.goto(url('index.html'));
  const menu=page.locator('.menu-toggle');
  await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
  await menu.click();await page.locator('#navigation a[href="./maintenance.html"]').click();
  await page.waitForLoadState('load');
  assert.ok(page.url().includes('maintenance.html'));
  await page.setViewportSize({width:1440,height:1000});
  assert.equal(await menu.getAttribute('aria-expanded'),'false');
  result.flows.push('Menu mobile : ouverture, fermeture, navigation et retour au bureau.');
  const details=page.locator('details');
  const count=await details.count();
  for(let i=0;i<count;i++){
    const item=details.nth(i),before=await item.getAttribute('open');
    await item.locator('summary').click();
    assert.notEqual(await item.getAttribute('open'),before);
    await item.locator('summary').click();
    assert.equal(await item.getAttribute('open'),before);
  }
  result.flows.push(`${count} accordéons ouverts et refermés.`);
  for(const [i,name] of ['Essentiel','Suivi','Continuité'].entries()) {
    await page.goto(url('maintenance.html'));
    await page.getByRole('link',{name:'Étudier cette formule'}).nth(i).click();
    await page.waitForLoadState('load');
    await page.waitForFunction(expected=>document.querySelector('#plan')?.value===expected,name);
    assert.equal(await page.locator('#need').inputValue(),'Maintenance');
    assert.equal(await page.locator('#plan').inputValue(),name);
  }
  result.flows.push('Trois formules : préremplissage correct du contact.');
  await page.goto(url('contact.html'));
  await page.locator('#next-step').click();
  assert.equal(await page.locator('#need').getAttribute('aria-invalid'),'true');
  await page.locator('#need').selectOption('Travaux');
  await page.locator('#trade').selectOption('Plomberie');
  await page.locator('#city').fill('Paris 75002');
  const description='Demande fictive de contrôle local. '.repeat(18)+'<img src=x onerror=alert(1)>';
  await page.locator('#description').fill(description);
  await page.locator('#next-step').click();
  await page.locator('#name').fill('Essai local sans envoi');
  await page.locator('#email').fill('incorrect');
  await page.getByRole('button',{name:'Préparer ma demande'}).click();
  assert.equal(await page.locator('#email').getAttribute('aria-invalid'),'true');
  await page.locator('#email').fill('essai@example.invalid');
  await page.getByRole('button',{name:'Préparer ma demande'}).click();
  assert.equal(await page.locator('#request-summary').isVisible(),true);
  assert.ok((await page.locator('#summary-text').inputValue()).includes(description));
  assert.equal(await page.locator('#request-summary img').count(),0);
  assert.ok((await page.locator('#email-request').getAttribute('href')).startsWith('mailto:contact@anelecgroupe.com?subject='));
  await page.locator('#copy-request').click();
  await page.getByText('Texte copié. Aucun message n’a été envoyé.').waitFor();
  assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('Essai local sans envoi'));
  await page.locator('#edit-request').click();
  await page.locator('#previous-step').click();
  assert.equal(await page.locator('#description').inputValue(),description);
  result.flows.push('Validation vide et courriel invalide ; récapitulatif, copie et modification sans envoi.');
  await page.setViewportSize({width:375,height:812});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.goto(url('contact.html?besoin=inconnu&formule=inconnue'));
  assert.equal(await page.locator('#need').inputValue(),'');
  assert.equal(await page.locator('#plan').inputValue(),'');
  result.flows.push('Demande longue et balises inertes ; paramètres inconnus ignorés.');
  await page.route('**/assets/architecture.webp',route=>route.abort());
  await page.goto(url('index.html'));
  await page.getByText('Le visuel est temporairement indisponible.').waitFor();
  result.flows.push('Image indisponible : repli visible.');
  assert.deepEqual(errors,[]);
  result.externalMessagesSent=0;
  await fs.writeFile('/home/user/workspace/groupe-atc-site/docs/browser-results-updated.json',JSON.stringify(result,null,2)+'\n');
  await context.close();
  return result;
}

export async function runCarouselQA(browser,base='http://127.0.0.1:3000/'){
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const result={galleries:6,placeholderCount:3,photoUploads:0,checks:[]};
  const target=new URL('metiers.html',base).href;
  try{
    await page.goto(target);
    const fixtureSource=await page.content();
    const galleries=page.locator('[data-carousel]');
    assert.equal(await galleries.count(),6);
    for(let i=0;i<6;i++){
      const g=galleries.nth(i),next=g.locator('.carousel-next'),previous=g.locator('.carousel-previous');
      assert.equal(await g.locator('.carousel-counter').textContent(),'Visuel 1 / 1');
      await next.click();assert.equal(await g.getAttribute('data-index'),'1');
      await next.click();assert.equal(await g.getAttribute('data-index'),'2');
      await next.click();assert.equal(await g.getAttribute('data-index'),'0');
      await previous.click();assert.equal(await g.getAttribute('data-index'),'2');
      await next.click();assert.equal(await g.getAttribute('data-index'),'0');
      for(let j=0;j<6;j++)if(i!==j)assert.equal(await galleries.nth(j).getAttribute('data-index'),'0');
      const box=await next.boundingBox();
      assert.ok(box.width>=44&&box.height>=44);
    }
    result.checks.push('Douze flèches, boucle aller-retour et six index indépendants.');
    const first=galleries.first(),next=first.locator('.carousel-next');
    await next.focus();await page.keyboard.press('ArrowRight');assert.equal(await first.getAttribute('data-index'),'1');
    await page.keyboard.press('End');assert.equal(await first.getAttribute('data-index'),'2');
    await page.keyboard.press('Home');assert.equal(await first.getAttribute('data-index'),'0');
    await page.keyboard.press('ArrowLeft');assert.equal(await first.getAttribute('data-index'),'2');
    assert.equal(await next.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
    await page.keyboard.press('Home');
    result.checks.push('Clavier gauche/droite, Début/Fin et indicateur de focus visible.');
    await next.click();
    await page.setViewportSize({width:375,height:812});
    await next.click();assert.equal(await first.getAttribute('data-index'),'2');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.screenshot({path:'/home/user/workspace/groupe-atc-site/docs/screenshots/carousel-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    await next.click();assert.equal(await first.getAttribute('data-index'),'0');
    await first.locator('.carousel-previous').click();
    await page.screenshot({path:'/home/user/workspace/groupe-atc-site/docs/screenshots/carousel-desktop.png',fullPage:true});
    result.checks.push('Bureau → téléphone → bureau, état conservé et aucun débordement.');
    const touchContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
    try{
      const mobile=await touchContext.newPage();
      await mobile.goto(target);
      const g=mobile.locator('[data-carousel]').first(),viewport=g.locator('.carousel-viewport');
      await viewport.scrollIntoViewIfNeeded();
      const rect=await viewport.boundingBox();
      const session=await touchContext.newCDPSession(mobile);
      const x1=rect.x+rect.width*.8,x2=rect.x+rect.width*.2,y=rect.y+rect.height*.5;
      await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x2,y}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      assert.equal(await g.getAttribute('data-index'),'1');
      await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x2,y}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1,y}]});
      await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      assert.equal(await g.getAttribute('data-index'),'0');
      await session.detach();
    }finally{await touchContext.close()}
    result.checks.push('Balayage tactile gauche/droite avec de vrais événements tactiles.');
    const encode=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const fixture=frames=>fixtureSource.replace(/data-frames="[^"]*"/,`data-frames="${encode(JSON.stringify(frames))}"`).replace('data-placeholder="true"','data-placeholder="false"');
    const a={src:'./assets/photo-plomberie-a-ajouter.png',alt:'Image de test A',caption:'Légende de test, non publiée'};
    const b={src:'./assets/photo-electricite-a-ajouter.png',alt:'Image de test B',caption:'Autre légende de test'};
    let html=fixture([a]);
    await page.route('**/metiers.html?carousel-qa=*',route=>route.fulfill({status:200,contentType:'text/html',body:html}));
    await page.goto(`${target}?carousel-qa=single`);
    assert.equal(await page.locator('[data-carousel]').first().locator('.carousel-counter').textContent(),'Photo 1 / 1');
    assert.equal(await page.locator('[data-carousel]').first().locator('.carousel-next').isDisabled(),true);
    assert.equal(await page.locator('[data-carousel]').first().locator('.carousel-previous').isDisabled(),true);
    html=fixture([a,b]);
    await page.goto(`${target}?carousel-qa=multiple`);
    await page.locator('[data-carousel]').first().locator('.carousel-next').click();
    assert.equal(await page.locator('[data-carousel]').first().locator('img').getAttribute('alt'),'Image de test B');
    assert.equal(await page.locator('[data-carousel]').first().locator('.carousel-caption').textContent(),b.caption);
    result.checks.push('Données de test locales : une photo désactive les flèches ; deux photos changent image, alt et légende.');
    html=fixture([a,{...b,src:'./assets/qa-photo-absente.png'}]);
    await page.route('**/assets/qa-photo-absente.png',route=>route.abort());
    await page.goto(`${target}?carousel-qa=broken`);
    const broken=page.locator('[data-carousel]').first();
    await broken.locator('.carousel-next').click();
    await broken.locator('.carousel-error').waitFor();
    await page.screenshot({path:'/home/user/workspace/groupe-atc-site/docs/screenshots/carousel-error.png',fullPage:false});
    await broken.locator('.carousel-next').click();
    await broken.locator('img').waitFor({state:'visible'});
    assert.equal(await broken.locator('.carousel-error').isHidden(),true);
    result.checks.push('Photo indisponible : message lisible, flèches utilisables et retour à une image valide.');
    const plainContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}});
    try{
      const plain=await plainContext.newPage();
      await plain.goto(target);
      assert.equal(await plain.locator('.carousel-controls:visible').count(),0);
      assert.equal(await plain.locator('.service-card').count(),6);
      assert.equal(await plain.locator('.service-card a').count(),6);
      await plain.locator('.service-card a').first().click();
      assert.ok(plain.url().includes('contact.html'));
    }finally{await plainContext.close()}
    result.checks.push('Sans JavaScript : image de couverture, six services et liens de contact conservés, contrôles inactifs masqués.');
    assert.deepEqual(errors,[]);
    result.errors=errors;
    return result;
  }finally{await context.close()}
}
