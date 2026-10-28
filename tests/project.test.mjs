import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { publishableProjects } from '../build.mjs';
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
