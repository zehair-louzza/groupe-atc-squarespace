/* ==========================================================================
   Build principal — site statique GROUPE ATC (anelecgroupe.com)
   - Génère les pages complètes (head, en-tête, pied de page) via shell()
   - Produit les fichiers d'hébergement : .htaccess, robots.txt, sitemap.xml, 404.html
   - Icônes et polices sont versionnées ; les régénérer avec `npm run build:assets`
   ========================================================================== */
import { robotsTxt, sitemapXml, llmsTxt } from './src/seo.mjs';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { shell, home, maintenance, trades, partnership, legalNotice, group, contact, information, notFound, esc } from './src/templates.mjs';

const root = new URL('./', import.meta.url);
const read = async (p) => JSON.parse(await fs.readFile(new URL(p, root), 'utf8'));

export function publishableProjects(items, enabled) {
  if (!enabled) return [];
  return items.filter(p => p.approved === true && p.rightsConfirmed === true && p.attribution && p.title && p.slug && p.photos?.length && p.photos.every(photo => photo.src && photo.alt));
}

export const pages = [
  { file: 'index.html', title: 'Plomberie, électricité, rénovation en Île-de-France', description: 'GROUPE ATC (ex-ANELEC) : maintenance, dépannage et travaux TCE à Paris et en Île-de-France, pour professionnels (B2B) et particuliers (B2C). Devis.', content: home },
  { file: 'maintenance.html', title: 'Contrat de maintenance multitechnique en Île-de-France', description: 'Maintenance multitechnique pour bureaux, commerces et logements : 2, 4 ou 12 visites par an, périmètre écrit et compte rendu. Paris et Île-de-France.', content: maintenance },
  { file: 'metiers.html', title: 'Plombier, électricien, serrurier en Île-de-France', description: 'Dépannage et travaux TCE à Paris et en Île-de-France : plomberie, électricité, serrurerie, rénovation intérieure, maçonnerie, menuiserie. B2B et B2C.', content: trades },
  { file: 'partenariat.html', title: 'Partenariat B2B : maintenance et travaux TCE en Île-de-France', description: 'Partenaire multitechnique des professionnels : directeur des travaux +15 ans d’expérience, techniciens +10 ans par métier, contrat cadre multi-sites. Île-de-France.', content: partnership },
  { file: 'groupe.html', title: 'ANELEC devient GROUPE ATC', description: 'GROUPE ATC est la nouvelle dénomination sociale d’ANELEC : même société (SIREN 933 108 607), nouvelle présidence, mêmes métiers en Île-de-France.', content: group },
  { file: 'contact.html', title: 'Demande de devis travaux et dépannage en Île-de-France', description: 'Demandez un devis à GROUPE ATC : dépannage, travaux ou maintenance à Paris et en Île-de-France. Professionnels et particuliers. 01 84 80 93 85.', content: contact },
  { file: 'informations.html', title: 'Informations légales et confidentialité', description: 'Identité de GROUPE ATC (SASU, SIREN 933 108 607), coordonnées, données du formulaire et conditions de la proposition de maintenance.', content: information },
  { file: 'mentions-legales.html', title: 'Mentions légales', description: 'Mentions légales de GROUPE ATC (SASU, SIREN 933 108 607) : éditeur, directrice de la publication, hébergeur, médiation, données personnelles et cookies.', content: legalNotice }
];

function htaccess(config) {
  const host = config.domain.replace(/\./g, '\\.');
  return `# GROUPE ATC — ${config.domain} (Hostinger / LiteSpeed)
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On
# www -> domaine nu (le HTTPS est géré par Hostinger)
RewriteCond %{HTTP_HOST} ^www\\.${host}$ [NC]
RewriteRule ^(.*)$ https://${config.domain}/$1 [R=301,L]
# Adresses sans .html : /maintenance -> maintenance.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]
# Fichiers techniques jamais servis
RewriteRule (^|/)\\.(?!well-known) - [F]
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
${config.publicationApproved ? '' : 'Header always set X-Robots-Tag "noindex, nofollow"\n'}</IfModule>

<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType text/html "access plus 0 seconds"
ExpiresByType text/css "access plus 7 days"
ExpiresByType application/javascript "access plus 7 days"
ExpiresByType image/svg+xml "access plus 30 days"
ExpiresByType image/webp "access plus 30 days"
ExpiresByType image/png "access plus 30 days"
ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;
}

export async function build({ assets = false } = {}) {
  const start = Date.now();
  if (assets) {
    const [{ buildIcons }, { downloadFonts }] = await Promise.all([import('./scripts/build-icons.mjs'), import('./scripts/download-fonts.mjs')]);
    await Promise.all([buildIcons(), downloadFonts()]);
  }
  const config = await read('./data/site.json');
  const legalData = await read('./data/legal.json');
  if (config.publicationApproved && !legalData.consumerMediator?.name) console.warn('Attention : médiateur de la consommation non renseigné dans data/legal.json (obligatoire pour les clients particuliers). Indexation maintenue à la demande de l’entreprise (2 novembre 2026).');
  const projects = await read('./data/projects.json');
  const visible = publishableProjects(projects, config.features.projects);
  const site = new URL('./site/', root);
  await fs.mkdir(site, { recursive: true });

  for (const p of pages) await fs.writeFile(new URL(p.file, site), shell(config, p, p.content(config), visible.length > 0));
  await fs.writeFile(new URL('404.html', site), shell(config, { file: '404.html', title: 'Page introuvable', description: 'Cette page n’existe pas ou a été déplacée.' }, notFound(config)));

  if (visible.length) {
    const body = `<section class="container page-intro"><h1>Nos réalisations</h1>${visible.map(p => `<article><h2>${esc(p.title)}</h2><p>${esc(p.location)} · ${esc(p.attribution)}</p><p>${esc(p.description)}</p>${p.photos.map(photo => `<img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy">`).join('')}</article>`).join('')}</section>`;
    await fs.writeFile(new URL('realisations.html', site), shell(config, { file: 'realisations.html', title: 'Réalisations', description: 'Projets validés de GROUPE ATC.' }, body, true));
  } else await fs.rm(new URL('realisations.html', site), { force: true });
  // Ancienne page générée sans gabarit ni script associé : retirée.
  await fs.rm(new URL('carte.html', site), { force: true });

  const base = `https://${config.domain}`;
  const urls = pages.map(p => p.file === 'index.html' ? `${base}/` : `${base}/${p.file}`);
  await fs.writeFile(new URL('.htaccess', site), htaccess(config));
  await fs.writeFile(new URL('robots.txt', site), robotsTxt(config));
  await fs.writeFile(new URL('llms.txt', site), llmsTxt(config, pages));
  if (config.publicationApproved) {
    await fs.writeFile(new URL('sitemap.xml', site), sitemapXml(urls, new Date().toISOString().slice(0, 10)));
  } else await fs.rm(new URL('sitemap.xml', site), { force: true });

  const manifest = pages.map(({ file, title, description }) => ({ file, title, description, slug: file === 'index.html' ? '/' : '/' + file.replace('.html', ''), status: 'draft', suggestedBlocks: ['text', 'image', 'button', 'form-where-applicable'] }));
  await fs.writeFile(new URL('./squarespace/pages.json', root), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Built ${pages.length} pages + 404 in ${((Date.now() - start) / 1000).toFixed(1)}s. Projects published: ${visible.length}. Publication approved: ${config.publicationApproved}.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build({ assets: process.argv.includes('--assets') }).catch(err => { console.error(err); process.exit(1); });
}
