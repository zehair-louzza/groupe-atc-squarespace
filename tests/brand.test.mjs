import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {shell,group,information} from '../src/templates.mjs';

const config=JSON.parse(await fs.readFile(new URL('../data/site.json',import.meta.url)));

test('Provided mark is preserved in a portable new GROUPE ATC vector logo',async()=>{
  const logo=await fs.readFile(new URL('../site/assets/groupe-atc-logo.svg',import.meta.url),'utf8');
  assert.ok(logo.includes('data-original-mark="anelec"'));
  assert.ok(logo.includes('data-lettering="GROUPE ATC"'));
  for(const color of ['#ffde59','#ff5757','#00bf63'])assert.ok(logo.includes(color));
  assert.equal(/href=|<script|data:image|<image/.test(logo),false);
  assert.ok((await fs.stat(new URL('../site/assets/groupe-atc-logo.png',import.meta.url))).size<100000);
  assert.ok((await fs.stat(new URL('../site/assets/anelec-original.svg',import.meta.url))).size>100000);
});

test('Current logo replaces the old visible logo and wordmarks',()=>{
  const html=shell(config,{title:'Accueil',description:'Présentation',file:'index.html'},group(config));
  assert.equal((html.match(/class="brand-logo"/g)||[]).length,2);
  assert.equal(html.includes('src="./assets/anelec-original'),false);
  assert.ok(html.includes('Le même symbole.'));
  assert.ok(information(config).includes('les fichiers ANELEC originaux restent archivés'));
});
