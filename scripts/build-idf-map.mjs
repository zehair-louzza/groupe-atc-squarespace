/* Génère data/idf-map.json : tracés SVG réels des 8 départements d'Île-de-France.
   Source : france-geojson (G. David, données IGN/INSEE simplifiées), licence ouverte.
   Usage : node scripts/build-idf-map.mjs */
import fs from 'node:fs/promises';
import { geoConicConformal, geoPath, geoCentroid } from 'd3-geo';
const SRC = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const codes = ['75','77','78','91','92','93','94','95'];
const all = await (await fetch(SRC)).json();
const features = all.features.filter(f => codes.includes(f.properties.code));
const fc = { type: 'FeatureCollection', features };
const W = 520, H = 400;
const projection = geoConicConformal().parallels([44, 49]).rotate([-3, 0]).fitExtent([[10, 10], [W - 10, H - 10]], fc);
const path = geoPath(projection);
const round = d => d.replace(/\d+\.\d+/g, n => (+n).toFixed(1));
const out = {
  source: 'france-geojson — github.com/gregoiredavid/france-geojson (IGN / INSEE)',
  viewBox: `0 0 ${W} ${H}`,
  departments: features.map(f => ({ code: f.properties.code, name: f.properties.nom, d: round(path(f)), centroid: projection(geoCentroid(f)).map(v => +v.toFixed(1)) })),
  // Siège : 9 rue des Colonnes, 75002 Paris
  headquarters: { label: 'Paris 2e', point: projection([2.3392, 48.8686]).map(v => +v.toFixed(1)) }
};
await fs.writeFile(new URL('../data/idf-map.json', import.meta.url), JSON.stringify(out) + '\n');
console.log('idf-map.json', out.departments.length, 'départements');
