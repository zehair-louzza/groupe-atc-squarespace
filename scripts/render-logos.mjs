// Rend les logos SVG GROUPE ATC en PNG transparents (Playwright / Chromium).
import { chromium } from 'playwright';
import fs from 'node:fs';
const jobs = [
  ['site/assets/logos/groupe-atc-logo-carre.svg', 'site/assets/logos/groupe-atc-logo-carre.png', 2000, 2000],
  ['site/assets/groupe-atc-logo.svg', 'site/assets/groupe-atc-logo.png', 510, 200],
  ['site/assets/groupe-atc-logo.svg', 'marque/logos/groupe-atc/groupe-atc-logo-horizontal-2040.png', 2040, 800],
];
const browser = await chromium.launch();
for (const [src, out, w, h] of jobs) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const svg = fs.readFileSync(src, 'utf8').replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+" height="\d+"/, `width="${w}" height="${h}"`);
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  fs.mkdirSync(out.replace(/\/[^/]+$/, ''), { recursive: true });
  await page.screenshot({ path: out, omitBackground: true });
  await page.close();
  console.log(out);
}
await browser.close();
