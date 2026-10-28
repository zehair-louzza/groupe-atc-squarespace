import fs from 'node:fs/promises';
import { shell, home, maintenance, trades, group, contact, information, esc, button } from './src/templates.mjs';
const config = JSON.parse(await fs.readFile(new URL('./data/site.json',import.meta.url)));
const projects = JSON.parse(await fs.readFile(new URL('./data/projects.json',import.meta.url)));
export function publishableProjects(items, enabled) {
  if (!enabled) return [];
  return items.filter(p => p.approved === true && p.rightsConfirmed === true && p.attribution && p.title && p.slug && p.photos?.length && p.photos.every(photo=>photo.src && photo.alt));
}
const visible = publishableProjects(projects, config.features.projects);
const pages = [
  {file:'index.html',title:'Maintenance & travaux en Île-de-France',description:'GROUPE ATC, anciennement ANELEC : plomberie, électricité, serrurerie et rénovation intérieure en Île-de-France.',content:home},
  {file:'maintenance.html',title:'Maintenance multitechnique',description:'Proposition de maintenance avec 2, 4 ou 12 visites par an, périmètre écrit et suivi. Offre à adapter après audit.',content:maintenance},
  {file:'metiers.html',title:'Travaux TCE, dépannage et métiers',description:'Plomberie, électricité, serrurerie et rénovation intérieure : des prestations définies selon votre besoin.',content:trades},
  {file:'groupe.html',title:'ANELEC devient GROUPE ATC',description:'Notre marque évolue. Découvrez GROUPE ATC et son approche de la maintenance et des travaux en Île-de-France.',content:group},
  {file:'contact.html',title:'Contact et demande de devis',description:'Décrivez votre besoin de dépannage, de travaux ou de maintenance en Île-de-France.',content:contact},
  {file:'informations.html',title:'Informations et confidentialité',description:'Cadre de la prévisualisation, données du formulaire et conditions de la proposition de maintenance.',content:information}
];
await fs.mkdir(new URL('./site/',import.meta.url),{recursive:true});
for(const p of pages) await fs.writeFile(new URL('./site/'+p.file,import.meta.url),shell(config,p,p.content(config),visible.length>0));
if(visible.length) {
  const body=`<section class="container page-intro"><h1>Nos réalisations</h1>${visible.map(p=>`<article><h2>${esc(p.title)}</h2><p>${esc(p.location)} · ${esc(p.attribution)}</p><p>${esc(p.description)}</p>${p.photos.map(photo=>`<img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy">`).join('')}</article>`).join('')}</section>`;
  await fs.writeFile(new URL('./site/realisations.html',import.meta.url),shell(config,{file:'realisations.html',title:'Réalisations',description:'Projets validés de GROUPE ATC.'},body,true));
} else await fs.rm(new URL('./site/realisations.html',import.meta.url),{force:true});
const manifest=pages.map(({file,title,description})=>({file,title,description,slug:file==='index.html'?'/':'/'+file.replace('.html',''),status:'draft',suggestedBlocks:['text','image','button','form-where-applicable']}));
await fs.writeFile(new URL('./squarespace/pages.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
console.log(`Built ${pages.length} pages. Projects published: ${visible.length}. Publication approved: ${config.publicationApproved}.`);
