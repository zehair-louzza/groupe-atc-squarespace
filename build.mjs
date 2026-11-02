/* ==========================================================================
   Build Principal — SSG Statique
   Génère site/ à partir de templates.mjs + données JSON
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { buildIcons } from './scripts/build-icons.mjs';
import { downloadFonts } from './scripts/download-fonts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_DIR = resolve(__dirname, 'site');
const DATA_DIR = resolve(__dirname, 'data');

async function build() {
  console.log('🏗️  Build GROUPE ATC — Démarrage');
  const start = Date.now();

  // 1. Générer sprite SVG + fonts (async parallel)
  await Promise.all([buildIcons(), downloadFonts()]);

  // 2. Copier assets statiques (images, fonts, icons, data)
  copyAssets();

  // 3. Générer pages HTML
  await generatePages();

  console.log(`✅ Build terminé en ${((Date.now() - start) / 1000).toFixed(1)}s`);
  console.log(`📁 Site généré dans: ${SITE_DIR}`);
}

function copyAssets() {
  console.log('📦 Copie assets...');
  
  // Créer dossiers cibles
  ['images', 'fonts', 'icons', 'data'].forEach(dir => {
    const path = `site/assets/${dir}`;
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  });

  // Copier images
  copyDir('assets/images', 'site/assets/images');
  // Copier data
  copyDir('data', 'site/assets/data');
  console.log('  ✅ Assets copiés');
}

function copyDir(src, dest) {
  if (!existsSync(src)) return;
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

async function generatePages() {
  console.log('📄 Génération pages HTML...');
  
  // Import dynamique du module templates
  const templates = await import('./src/templates.mjs');
  const siteConfig = JSON.parse(readFileSync('./data/site.json', 'utf8'));
  const services = JSON.parse(readFileSync('./data/services.json', 'utf8'));
  const legal = JSON.parse(readFileSync('./data/legal.json', 'utf8'));

  const config = { ...siteConfig, plans: siteConfig.plans || [], teamExperienceStatement: siteConfig.teamExperienceStatement };
  const servicesData = { ...services, families: services.families };

  const pages = [
    { file: 'index.html', title: 'Accueil', description: 'Maintenance multitechnique et travaux en Île-de-France. GROUPE ATC — Entretenir, dépanner, rénover.', content: templates.home({ ...config, services: servicesData }) },
    { file: 'maintenance.html', title: 'Maintenance', description: 'Maintenance multitechnique : visites planifiées, périmètre écrit, suivi des actions.', content: templates.maintenance({ ...config, plans: config.plans, services: servicesData }) },
    { file: 'metiers.html', title: 'Travaux & métiers', description: 'Plomberie, électricité, serrurerie, rénovation, maçonnerie, menuiserie.', content: templates.trades({ ...config, services: servicesData }) },
    { file: 'groupe.html', title: 'Le groupe', description: 'GROUPE ATC — Nouvelle dénomination d\'ANELEC. Même société, nouvelle présidence.', content: templates.group({ ...config, legal }) },
    { file: 'contact.html', title: 'Contact & devis', description: 'Demande de devis : dépannage, travaux, maintenance. Île-de-France.', content: templates.contact({ ...config, plans: config.plans || [], services: servicesData }) },
    { file: 'informations.html', title: 'Informations', description: 'Identité, coordonnées, mentions légales, données, formulaire.', content: templates.information({ ...config, legal }) },
    // Page carte
    { file: 'carte.html', title: 'Carte interactive Île-de-France', description: 'Carte interactive des départements et communes d\'Île-de-France pour demande de devis localisée.', content: `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Carte interactive Île-de-France | GROUPE ATC</title><meta name="description" content="Carte interactive des départements et communes d'Île-de-France pour demande de devis localisée."><meta name="theme-color" content="#1E3A5F"><link rel="preconnect" href="https://api.fontshare.com"><link href="https://api.fontshare.com/v2/css?f[]=league-spartan@400,500,600,700&f[]=poppins@400,500,600,700&display=swap" rel="stylesheet"><link rel="stylesheet" href="./base.css"><link rel="stylesheet" href="./style.css"><script src="./app.js" defer></script></head><body class="map-page"><a class="skip-link" href="#contenu">Aller au contenu</a><header class="site-header"><div class="container header-inner"><a class="brand" href="./index.html" aria-label="GROUPE ATC, accueil"><img class="brand-logo" src="./assets/groupe-atc-logo.svg" alt="GROUPE ATC" width="1050" height="250" decoding="async"></a><button class="menu-toggle" aria-controls="navigation" aria-expanded="false" aria-label="Ouvrir le menu">Menu <span aria-hidden="true">+</span></button><nav id="navigation" aria-label="Navigation principale"><a href="./index.html">Accueil</a><a href="./maintenance.html">Maintenance</a><a href="./metiers.html">Travaux & métiers</a><a href="./groupe.html">Le groupe</a><a class="nav-contact" href="./contact.html">Parlons de votre projet <svg class="icon" aria-hidden="true"><use xlink:href="/assets/icons/sprite.svg#lucide-arrow-right"></use></svg></a></nav></div></header><main id="contenu"><div class="map-breadcrumb" id="map-breadcrumb"></div><div class="map-container" id="map-container"><div class="map-libre" id="map-libre"></div><div class="map-overlay"><div class="map-search" id="map-search"><form class="search-form" role="search"><svg class="search-form__icon" aria-hidden="true"><use xlink:href="/assets/icons/sprite.svg#lucide-search"></use></svg><input type="search" class="search-form__input" id="map-search-input" placeholder="Rechercher une commune (ex. Créteil, 94000)..." autocomplete="off" aria-label="Rechercher une commune"><div id="map-search-results" class="search-results" hidden></div></form></div><div class="map-controls" id="map-controls"><button class="icon-btn icon-btn-primary" id="map-zoom-in" aria-label="Zoom avant" title="Zoom avant"><svg class="icon" aria-hidden="true"><use xlink:href="/assets/icons/sprite.svg#lucide-zoom-in"></use></svg></button><button class="icon-btn icon-btn-primary" id="map-zoom-out" aria-label="Zoom arrière" title="Zoom arrière"><svg class="icon" aria-hidden="true"><use xlink:href="/assets/icons/sprite.svg#lucide-zoom-out"></use></svg></button><button class="icon-btn icon-btn-outline" id="map-reset" aria-label="Réinitialiser la vue" title="Réinitialiser"><svg class="icon" aria-hidden="true"><use xlink:href="/assets/icons/sprite.svg#lucide-rotate-ccw"></use></svg></button></div><div class="map-breadcrumb" id="map-breadcrumb"></div></div></main><footer class="site-footer"><div class="container footer-grid"><div><a class="brand" href="./index.html" aria-label="GROUPE ATC, accueil"><img class="brand-logo" src="./assets/groupe-atc-logo.svg" alt="GROUPE ATC" width="1050" height="250" decoding="async"></a><p>Maintenance multitechnique.<br>Travaux et rénovation en Île-de-France.</p></div><div><p class="eyebrow">Contact</p><a href="tel:+33123456789">01 23 45 67 89</a><a class="email" href="mailto:contact@groupe-atc.fr">contact@groupe-atc.fr</a><p>123 Rue de la Paix, 75001 Paris</p></div><div><p class="eyebrow">À explorer</p><a href="./maintenance.html">Nos propositions de maintenance</a><a href="./metiers.html">Nos métiers</a><a href="./groupe.html">ANELEC devient GROUPE ATC</a><a href="./informations.html">Informations & confidentialité</a></div></div><div class="container footer-bottom"><span>© 2025 GROUPE ATC</span><span>groupe-atc.fr</span></div></footer><script src="./app.js" defer></script></body></html>` }
  ];

  for (const page of pages) {
    const html = page.content;
    writeFileSync(`site/${page.file}`, html);
    console.log(`  ✅ ${page.file}`);
  }
  
  // Page carte spéciale (map-page)
  console.log('  ✅ carte.html (map-page)');
}

build().catch(console.error);
