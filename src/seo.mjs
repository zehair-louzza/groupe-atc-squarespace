/* Référencement — GROUPE ATC
 * Données structurées schema.org (JSON-LD), robots.txt, sitemap.xml et llms.txt.
 * Règle : uniquement des faits vérifiés (data/site.json, data/legal.json, data/services.json).
 * Aucun avis, note, horaire, prix ou délai inventé.
 */
import { readFileSync } from 'node:fs';
const services = JSON.parse(readFileSync(new URL('../data/services.json', import.meta.url), 'utf8'));
const legal = JSON.parse(readFileSync(new URL('../data/legal.json', import.meta.url), 'utf8'));

export const DEPARTEMENTS = [
  ['75', 'Paris'], ['77', 'Seine-et-Marne'], ['78', 'Yvelines'], ['91', 'Essonne'],
  ['92', 'Hauts-de-Seine'], ['93', 'Seine-Saint-Denis'], ['94', 'Val-de-Marne'], ['95', 'Val-d’Oise'],
];

/** Liste lisible des départements, ex. « Paris (75), Seine-et-Marne (77)… » */
export const departementsText = () => DEPARTEMENTS.map(([c, n]) => `${n} (${c})`).join(', ');

function postalAddress(config) {
  // « 9 RUE DES COLONNES, 75002 PARIS »
  const [street, rest = ''] = config.address.split(',').map(s => s.trim());
  const [, postalCode = '', city = ''] = rest.match(/^(\d{5})\s+(.+)$/) || [];
  return { '@type': 'PostalAddress', streetAddress: street, postalCode, addressLocality: city.charAt(0) + city.slice(1).toLowerCase(), addressRegion: 'Île-de-France', addressCountry: 'FR' };
}

const audiences = [
  { '@type': 'BusinessAudience', audienceType: 'Professionnels (B2B) : entreprises, bureaux, commerces, secteur tertiaire, gestionnaires de biens' },
  { '@type': 'Audience', audienceType: 'Particuliers (B2C) : appartements et maisons' },
];

export function areaServed() {
  return [
    { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    ...DEPARTEMENTS.map(([code, name]) => ({ '@type': 'AdministrativeArea', name: `${name} (${code})` })),
  ];
}

function organization(config, base) {
  return {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': `${base}/#entreprise`,
    name: config.brand,
    legalName: legal.registeredName,
    alternateName: [config.brandFull, legal.formerRegisteredName, config.formerBrand],
    description: `${config.brand} (anciennement ${config.formerBrand}) : entreprise de maintenance multitechnique, dépannage et travaux tous corps d’état en Île-de-France, au service des professionnels (B2B) et des particuliers (B2C). Plomberie, électricité, serrurerie, rénovation intérieure, maçonnerie et menuiserie.`,
    slogan: 'La maîtrise technique. L’énergie du terrain.',
    url: `${base}/`,
    logo: { '@type': 'ImageObject', url: `${base}/assets/logos/groupe-atc-logo-carre.png` },
    image: [`${base}/assets/visuels/hero-technicien.webp`],
    telephone: config.phone,
    email: config.email,
    address: postalAddress(config),
    areaServed: areaServed(),
    foundingDate: legal.sireneRegistrationDate,
    vatID: legal.vatNumber,
    taxID: legal.siren,
    numberOfEmployees: { '@type': 'QuantitativeValue', value: legal.employees },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: legal.siren },
      { '@type': 'PropertyValue', propertyID: 'SIRET', value: legal.headquartersSiret },
    ],
    knowsLanguage: 'fr',
    knowsAbout: ['Maintenance multitechnique', 'Travaux tous corps d’état (TCE)', 'Dépannage', ...services.families.map(f => f.title)],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: config.phone, email: config.email, areaServed: 'FR-IDF', availableLanguage: 'French' }],
    sameAs: [legal.sources.official, legal.sources.registryAggregator],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Prestations GROUPE ATC',
      itemListElement: services.families.map(f => ({ '@type': 'Offer', itemOffered: { '@id': `${base}/metiers.html#service-${f.id}` } })),
    },
  };
}

function serviceNodes(config, base) {
  const provider = { '@id': `${base}/#entreprise` };
  const list = services.families.map(f => ({
    '@type': 'Service', '@id': `${base}/metiers.html#service-${f.id}`,
    name: `${f.title} en Île-de-France`, serviceType: f.title,
    description: `${f.title} en Île-de-France pour les professionnels et les particuliers : ${(f.items || []).join(', ').toLowerCase()}.`,
    url: `${base}/metiers.html#${f.id}`, provider, areaServed: areaServed(), audience: audiences,
  }));
  list.push({
    '@type': 'Service', '@id': `${base}/maintenance.html#service-maintenance`,
    name: 'Maintenance multitechnique en Île-de-France', serviceType: 'Maintenance multitechnique',
    description: 'Contrat de maintenance avec 2, 4 ou 12 visites par an, périmètre écrit et compte rendu des actions réalisées. Offre adaptée après audit.',
    url: `${base}/maintenance.html`, provider, areaServed: areaServed(), audience: audiences,
  });
  return list;
}

/** Extrait les questions / réponses (<details><summary>…?</summary>…</details>) pour FAQPage. */
export function faqFrom(html) {
  const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const out = [];
  for (const m of html.matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    const q = strip(m[1]), a = strip(m[2]);
    if (q.endsWith('?') && a) out.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
  }
  return out;
}

const pageName = { 'index.html': 'Accueil', 'maintenance.html': 'Maintenance', 'metiers.html': 'Métiers', 'partenariat.html': 'Partenariat B2B', 'groupe.html': 'Le groupe', 'contact.html': 'Contact et devis', 'informations.html': 'Informations', 'mentions-legales.html': 'Mentions légales', 'realisations.html': 'Réalisations' };

export function structuredData(config, page, body = '') {
  const base = `https://${config.domain}`;
  const url = page.file === 'index.html' ? `${base}/` : `${base}/${page.file}`;
  const graph = [
    { '@type': 'WebSite', '@id': `${base}/#site`, url: `${base}/`, name: config.brand, alternateName: [config.formerBrand, config.brandFull], inLanguage: 'fr-FR', publisher: { '@id': `${base}/#entreprise` } },
    organization(config, base),
    {
      '@type': page.file === 'contact.html' ? 'ContactPage' : page.file === 'groupe.html' ? 'AboutPage' : 'WebPage',
      '@id': `${url}#page`, url, name: `${page.title} | ${config.brand}`, description: page.description, inLanguage: 'fr-FR',
      isPartOf: { '@id': `${base}/#site` }, about: { '@id': `${base}/#entreprise` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${base}/assets/visuels/hero-technicien.webp` },
      ...(page.file !== 'index.html' ? { breadcrumb: { '@id': `${url}#fil` } } : {}),
    },
  ];
  if (page.file !== 'index.html' && page.file !== '404.html') graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#fil`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: pageName[page.file] || page.title, item: url },
    ],
  });
  if (['index.html', 'metiers.html', 'maintenance.html'].includes(page.file)) graph.push(...serviceNodes(config, base));
  const faq = faqFrom(body);
  if (faq.length) graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faq });
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

/** Robots d'indexation classiques et moteurs de réponse IA autorisés une fois le site publié. */
export const AI_CRAWLERS = ['Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Applebot', 'Applebot-Extended', 'DuckDuckBot', 'YandexBot', 'Qwantbot', 'CCBot', 'Amazonbot', 'meta-externalagent', 'MistralAI-User'];

export function robotsTxt(config) {
  const base = `https://${config.domain}`;
  if (!config.publicationApproved) return `# Préparation : indexation désactivée tant que publicationApproved=false\nUser-agent: *\nDisallow: /\n`;
  return `# GROUPE ATC — ${config.domain}\n# Moteurs de recherche et moteurs de réponse IA bienvenus.\n${AI_CRAWLERS.map(a => `User-agent: ${a}`).join('\n')}\nAllow: /\n\nUser-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${base}/sitemap.xml\n`;
}

export function sitemapXml(urls, lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}

/** llms.txt : résumé factuel destiné aux moteurs de réponse IA (proposition llmstxt.org). */
export function llmsTxt(config, pages) {
  const base = `https://${config.domain}`;
  return `# ${config.brand}

> ${config.brand} (anciennement ${config.formerBrand}, ${legal.legalForm}, SIREN ${legal.sirenDisplay}) est une entreprise de maintenance multitechnique, de dépannage et de travaux tous corps d’état (TCE) basée à Paris et intervenant dans toute l’Île-de-France, pour les professionnels (B2B) comme pour les particuliers (B2C).

- Métiers : ${services.families.map(f => f.title.toLowerCase()).join(', ')}.
- Clientèle : professionnels (B2B : entreprises, bureaux, commerces, secteur tertiaire, gestionnaires de biens) et particuliers (B2C : appartements et maisons).
- Zone d’intervention : Île-de-France — ${departementsText()}.
- Effectif : ${legal.employeesDisplay}.
- Équipe : ${config.teamExperienceStatement}
- Engagements : ${config.keyCommitments.map(k => k.value + " " + k.label).join(" ; ")}
- Partenariat professionnel (B2B, contrat cadre multi-sites) : ${base}/partenariat.html
- Siège : ${config.address}.
- Téléphone : ${config.phoneDisplay} · Courriel : ${config.email}
- Demande de devis : ${base}/contact.html
- ${config.formerBrand} et ${config.brand} sont la même société (changement de dénomination sociale, sans création d’une nouvelle entreprise).
- Les demandes urgentes peuvent être signalées dans le formulaire ; la disponibilité est confirmée par téléphone. Chaque intervention fait l’objet d’une proposition.

## Pages

${pages.map(p => `- [${p.title}](${p.file === 'index.html' ? `${base}/` : `${base}/${p.file}`}) : ${p.description}`).join('\n')}

## Identité légale

- Dénomination : ${legal.registeredName} (${legal.legalFormFull})
- SIREN : ${legal.sirenDisplay} · SIRET du siège : ${legal.headquartersSiretDisplay} · TVA : ${legal.vatNumber}
- Fiche officielle : ${legal.sources.official}
`;
}
