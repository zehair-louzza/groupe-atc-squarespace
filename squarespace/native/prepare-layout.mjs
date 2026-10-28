import fs from 'node:fs/promises';
import path from 'node:path';

const directory = path.dirname(new URL(import.meta.url).pathname);
const pages = [
  ['accueil', 'Accueil'],
  ['maintenance', 'Maintenance'],
  ['metiers', 'Métiers'],
  ['groupe', 'Groupe'],
  ['contact', 'Contact'],
  ['informations', 'Informations']
];
const result = [];
for (const [file, name] of pages) {
  const source = await fs.readFile(path.join(directory, `${file}.md`), 'utf8');
  const chunks = source.split(/(?=^## )/m);
  const title = chunks.shift().trim();
  const introduction = (chunks.shift() || '').replace(/^## /, '').trim();
  let hero = `${title}\n\n${introduction}\n`;
  if (file === 'accueil') {
    hero = hero.replace(/^# GROUPE ATC/, '# Le bâtiment, dans la durée.')
      .replace(/\n\nLe bâtiment, dans la durée\.\n/, '\n');
    hero += '\n<small>Visuel d’illustration, non contractuel.</small>\n';
  }
  const sections = [{kind: 'hero', markdown: hero}];
  for (let i = 0; i < chunks.length; i += 2) {
    sections.push({kind: 'content', markdown: chunks.slice(i, i + 2).join('\n').trim() + '\n'});
  }
  result.push({file, name, slug: `groupe-atc-${file}`, sections});
}
await fs.writeFile(path.join(directory, 'layout.json'), JSON.stringify(result, null, 2) + '\n');
console.log(result.map(p => `${p.name}: ${p.sections.length} sections`).join('\n'));
