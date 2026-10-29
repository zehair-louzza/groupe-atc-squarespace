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
        result.flows.push(`Six services et six photos : ${width===1440?'trois colonnes, deux rangées':'une colonne mobile'}.`);
      }
      await page.screenshot({path:`${directory}/updated-${file}-${width}.png`,fullPage:true});
    }
  }
  const serviceFamilies=JSON.parse(await fs.readFile('/home/user/workspace/groupe-atc-site/data/services.json','utf8')).families;
  await page.setViewportSize({width:1440,height:1000});
  for(const f of serviceFamilies){
    await page.goto(url('metiers.html'));
    await page.locator(`#${f.id}`).getByRole('link',{name:'Décrire mon besoin'}).click();
    assert.equal(await page.locator('#trade').inputValue(),f.formValue);
    assert.equal(await page.locator('#need').inputValue(),'Travaux');
  }
  result.flows.push('Les six liens métier préremplissent le contact avec la bonne prestation.');
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
