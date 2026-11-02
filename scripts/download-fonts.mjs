/* ==========================================================================
   Téléchargement Fonts — League Spartan + Poppins (Variable/Static WOFF2)
   Source : Google Fonts / Fontshare
   ========================================================================== */
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import https from 'https';

const FONTS_DIR = 'site/assets/fonts';
const FONTS = [
  // League Spartan (Variable Font - tous poids)
  { family: 'League Spartan', file: 'LeagueSpartan-VariableFont_wght.woff2', url: 'https://github.com/google/fonts/raw/main/ofl/leaguespartan/LeagueSpartan%5Bwght%5D.ttf' },
  // Poppins Static (plus fiable que variable pour production)
  { family: 'Poppins', weight: 400, file: 'Poppins-Regular.woff2', url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf' },
  { family: 'Poppins', weight: 500, file: 'Poppins-Medium.woff2', url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Medium.ttf' },
  { family: 'Poppins', weight: 600, file: 'Poppins-SemiBold.woff2', url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf' },
  { family: 'Poppins', weight: 700, file: 'Poppins-Bold.woff2', url: 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf' }
];

// Note: Les URLs GitHub raw donnent des TTF. Pour WOFF2, on utilise des sources alternatives fiables.
// Alternative: utiliser Google Fonts API ou télécharger depuis fontshare.com
// Pour simplicité, on utilise des URLs CDN fiables qui servent du WOFF2 directement.

const FONT_SOURCES = [
  // League Spartan Variable (depuis Fontshare CDN)
  { file: 'LeagueSpartan-VariableFont_wght.woff2', url: 'https://api.fontshare.com/v2/fonts/league-spartan/weights/Variable/LeagueSpartan-VariableFont_wght.woff2' },
  // Poppins depuis Google Fonts CDN (WOFF2)
  { file: 'Poppins-Regular.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJbecmNE.woff2' },
  { file: 'Poppins-Medium.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2' },
  { file: 'Poppins-SemiBold.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2' },
  { file: 'Poppins-Bold.woff2', url: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z11lFd.woff2' }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', reject);
    file.on('error', err => { require('fs').unlink(dest, () => {}); reject(err); });
  });
}

async function downloadAll() {
  const { mkdirSync } = require('fs');
  if (!require('fs').existsSync('site/assets/fonts')) {
    require('fs').mkdirSync('site/assets/fonts', { recursive: true });
  }

  console.log('📥 Téléchargement des polices...');
  
  for (const font of FONT_SOURCES) {
    const dest = `site/assets/fonts/${font.file}`;
    try {
      console.log(`  ⬇️  ${font.file}...`);
      await downloadFile(font.url, dest);
      console.log(`  ✅ ${font.file}`);
    } catch (err) {
      console.warn(`  ⚠️  Échec ${font.file}: ${err.message}`);
    }
  }
  
  console.log('✅ Téléchargement terminé');
}

downloadAll().catch(console.error);
