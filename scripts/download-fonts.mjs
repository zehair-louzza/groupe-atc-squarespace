/* ==========================================================================
   Téléchargement Fonts — League Spartan (body) + Poppins (display)
   Source : google-webfonts-helper API (WOFF2, latin subset)
   ========================================================================== */
import { mkdirSync, writeFileSync, existsSync, createWriteStream, unlinkSync, statSync } from 'fs';
import https from 'https';

const FONTS_DIR = 'site/assets/fonts';

// Font weights needed based on CSS analysis:
// --font-body (Switzer → League Spartan): 400, 500, 600
// --font-display (General Sans → Poppins): 400, 500, 600
// font-weight:600 used for headings, 500 for buttons, 400 for body

const FONT_SOURCES = [
  // League Spartan Variable (all weights 100-900 in one file) - for body text
  { 
    family: 'League Spartan', 
    file: 'LeagueSpartan-VariableFont_wght.woff2', 
    url: 'https://fonts.gstatic.com/s/leaguespartan/v15/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oXZA81d.woff2',
    weight: 'variable',
    style: 'normal'
  },
  // Poppins Static weights - for display/headings
  { 
    family: 'Poppins', 
    weight: 400, 
    file: 'Poppins-Regular.woff2', 
    url: 'https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2',
    style: 'normal'
  },
  { 
    family: 'Poppins', 
    weight: 500, 
    file: 'Poppins-Medium.woff2', 
    url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
    style: 'normal'
  },
  { 
    family: 'Poppins', 
    weight: 600, 
    file: 'Poppins-SemiBold.woff2', 
    url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2',
    style: 'normal'
  },
  { 
    family: 'Poppins', 
    weight: 700, 
    file: 'Poppins-Bold.woff2', 
    url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
    style: 'normal'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, response => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          downloadFile(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
      }
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', reject);
    file.on('error', err => {
      try { unlinkSync(dest); } catch {}
      reject(err);
    });
  });
}

function generateFontFaceCSS() {
  let css = '/* ==========================================================================\n';
  css += '   @font-face declarations — Self-hosted fonts\n';
  css += '   Source: google-webfonts-helper (WOFF2, latin subset)\n';
  css += '   License: League Spartan (OFL), Poppins (OFL)\n';
  css += '   ========================================================================== */\n\n';

  // League Spartan Variable (body text)
  css += '@font-face {\n';
  css += "  font-family: 'League Spartan';\n";
  css += "  src: url('./LeagueSpartan-VariableFont_wght.woff2') format('woff2-variations');\n";
  css += "  font-weight: 100 900;\n";
  css += "  font-style: normal;\n";
  css += "  font-display: swap;\n";
  css += '}\n\n';

  // Poppins static weights (display/headings)
  const poppinsWeights = [
    { weight: 400, file: 'Poppins-Regular.woff2' },
    { weight: 500, file: 'Poppins-Medium.woff2' },
    { weight: 600, file: 'Poppins-SemiBold.woff2' },
    { weight: 700, file: 'Poppins-Bold.woff2' }
  ];

  for (const w of poppinsWeights) {
    css += '@font-face {\n';
    css += "  font-family: 'Poppins';\n";
    css += `  src: url('./${w.file}') format('woff2');\n`;
    css += `  font-weight: ${w.weight};\n`;
    css += "  font-style: normal;\n";
    css += "  font-display: swap;\n";
    css += '}\n\n';
  }

  return css;
}

async function downloadAll() {
  if (!existsSync(FONTS_DIR)) {
    mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log('📥 Téléchargement des polices...');
  
  for (const font of FONT_SOURCES) {
    const dest = `${FONTS_DIR}/${font.file}`;
    try {
      console.log(`  ⬇️  ${font.file}...`);
      await downloadFile(font.url, dest);
      
      // Verify file size > 0
      const stats = statSync(dest);
      if (stats.size === 0) {
        throw new Error('Empty file downloaded');
      }
      console.log(`  ✅ ${font.file} (${stats.size} bytes)`);
    } catch (err) {
      console.warn(`  ⚠️  Échec ${font.file}: ${err.message}`);
      try { unlinkSync(dest); } catch {}
    }
  }

  // Generate @font-face CSS
  const fontFaceCSS = generateFontFaceCSS();
  writeFileSync(`${FONTS_DIR}/fonts.css`, fontFaceCSS);
  console.log(`  ✅ fonts.css généré`);
  
  console.log('✅ Téléchargement terminé');
}

export async function downloadFonts() {
  return downloadAll();
}

downloadAll().catch(console.error);