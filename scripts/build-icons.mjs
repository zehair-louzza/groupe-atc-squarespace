/* ==========================================================================
   Build SVG Sprite — Lucide (via GitHub release) + Tabler (local)
   Génère site/assets/icons/sprite.svg
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { optimize } from 'svgo';
import https from 'https';

const LUCIDE_ICONS = [
  'wrench', 'hammer', 'hard-hat', 'building-2', 'truck', 'pipe', 'zap', 'shield',
  'screwdriver', 'drill', 'saw', 'paintbrush', 'package', 'box', 'loader',
  'rotate-cw', 'git-branch', 'git-merge', 'database', 'server', 'monitor',
  'smartphone', 'tablet', 'laptop', 'desktop', 'printer', 'phone', 'mail',
  'send', 'inbox', 'archive', 'trash-2', 'edit-2', 'save', 'copy',
  'clipboard', 'clipboard-list', 'clipboard-check', 'search', 'filter',
  'sliders-horizontal', 'toggle-left', 'toggle-right', 'checkbox',
  'square-check', 'square-x', 'square-plus', 'square-minus', 'check', 'x',
  'plus', 'minus', 'plus-circle', 'minus-circle', 'check-circle', 'x-circle',
  'alert-circle', 'alert-triangle', 'info', 'help-circle', 'bell', 'calendar',
  'clock', 'timer', 'hourglass', 'sun', 'moon', 'cloud', 'cloud-rain',
  'cloud-snow', 'cloud-lightning', 'wind', 'droplets', 'flame', 'zap',
  'battery', 'plug', 'lightbulb', 'flashlight', 'monitor', 'camera', 'video',
  'mic', 'headphones', 'music', 'volume-1', 'volume-2', 'volume-x', 'volume-off',
  'heart', 'heart-pulse', 'activity', 'stethoscope', 'pill', 'syringe',
  'bandage', 'thermometer', 'dna', 'bone', 'skull', 'brain', 'handshake',
  'users', 'user', 'building', 'factory', 'warehouse', 'store', 'shop', 'home',
  'briefcase', 'folder', 'file', 'file-text', 'file-code', 'file-json',
  'file-csv', 'file-spreadsheet', 'file-pdf', 'file-archive', 'scan',
  'search', 'zoom-in', 'zoom-out', 'maximize', 'minimize', 'layout',
  'layout-dashboard', 'layout-grid', 'layout-list', 'grid', 'rows', 'columns',
  'split', 'square', 'circle', 'triangle', 'star', 'award', 'trophy', 'medal',
  'flag', 'bookmark', 'tag', 'pricetags', 'receipt', 'banknote', 'coins',
  'credit-card', 'wallet', 'piggy-bank', 'safe', 'vault', 'lock', 'unlock',
  'key', 'fingerprint', 'eye', 'user', 'users', 'group', 'team', 'organization',
  'home', 'folder', 'file', 'map-pin', 'navigation', 'navigation-2',
  'compass', 'map', 'map-pin', 'map-pinned', 'route', 'navigation-2',
  'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'chevron-right',
  'chevron-left', 'chevron-up', 'chevron-down', 'chevrons-right',
  'chevrons-left', 'chevrons-up', 'chevrons-down', 'arrow-right-circle',
  'arrow-left-circle', 'arrow-up-circle', 'arrow-down-circle',
  'file-plus', 'file-minus', 'file-check', 'file-x', 'file-text',
  'folder-plus', 'folder-minus', 'folder-open', 'folder-heart',
  'folder-kanban', 'folder-search', 'folder-sync', 'folder-tree',
  'image', 'image-plus', 'image-minus', 'image-off', 'scan', 'scan-line',
  'scan-qr-code', 'scan-eye', 'scan-face', 'scan-text', 'scan-heart',
  'qr-code', 'barcode', 'barcode-scanner', 'fingerprint', 'eye', 'eye-off',
  'eye-closed', 'eye-open', 'user', 'user-plus', 'user-minus', 'user-x',
  'user-check', 'user-cog', 'user-lock', 'user-unlock', 'user-round',
  'user-round-plus', 'user-round-minus', 'user-round-x', 'user-round-check',
  'user-round-cog', 'user-round-lock', 'user-round-unlock', 'users',
  'users-round', 'group', 'team', 'organization', 'building', 'building-2',
  'factory', 'warehouse', 'store', 'shop', 'home', 'briefcase', 'folder', 'file'
];

const TABLER_ICONS = [
  'welding', 'bulldozer', 'scaffolding', 'concrete', 'steel-beam', 'hard-hat',
  'crane', 'excavator', 'forklift', 'cement', 'concrete', 'steel', 'beam',
  'column', 'roof', 'window', 'door', 'gate', 'fence', 'stairs', 'ladder',
  'scaffolding', 'helmet', 'vest', 'gloves', 'boots', 'glasses', 'goggles',
  'mask', 'respirator', 'ear-protection', 'safety-vest', 'harness', 'rope',
  'carabiner', 'pulley', 'winch', 'hoist', 'chain', 'wire', 'cable', 'pipe',
  'valve', 'pump', 'filter', 'tank', 'reservoir', 'meter', 'gauge', 'thermometer',
  'extinguisher', 'hydrant', 'hose', 'sprinkler', 'alarm', 'siren', 'exit',
  'emergency', 'first-aid', 'stretcher', 'ambulance', 'hospital', 'clinic',
  'pharmacy', 'laboratory', 'microscope', 'test-tube', 'flask', 'beaker',
  'petri-dish', 'dna', 'virus', 'bacteria', 'cell', 'heart', 'heart-pulse',
  'heart-rate', 'ecg', 'stethoscope', 'syringe', 'pill', 'capsule', 'bandage',
  'thermometer', 'weight', 'scale', 'bmi', 'body', 'skeleton', 'skull', 'brain',
  'lung', 'heart', 'kidney', 'liver', 'stomach', 'intestine', 'muscle', 'bone',
  'tooth', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'leg', 'arm',
  'finger', 'fingerprint', 'iris', 'retina', 'pupil', 'cornea', 'lens',
  'optic-nerve', 'brain', 'neuron', 'synapse', 'synapse-2', 'neural-network', 'ai', 'robot',
  'cpu', 'gpu', 'motherboard', 'ram', 'hard-drive', 'ssd', 'memory', 'chip',
  'circuit', 'transistor', 'resistor', 'capacitor', 'inductor', 'diode', 'led',
  'led-off', 'switch', 'toggle', 'button', 'slider', 'knob', 'dial', 'gauge',
  'meter', 'display', 'screen', 'monitor', 'tv', 'projector', 'camera',
  'camera-off', 'video', 'video-off', 'photo', 'image', 'gallery', 'album',
  'picture', 'frame', 'canvas', 'palette', 'brush', 'pencil', 'pen', 'pen-tool',
  'pen-line', 'pen-off', 'highlighter', 'marker', 'crayon', 'paintbrush',
  'paint-bucket', 'spray-can', 'roller', 'roller-2', 'spray', 'airbrush',
  'eraser', 'eraser-2', 'dropper', 'fill', 'gradient', 'eyedropper',
  'color-picker', 'color-swatch', 'palette', 'swatch', 'swatches', 'hue',
  'saturation', 'brightness', 'contrast', 'exposure', 'gamma', 'blur',
  'sharpen', 'noise', 'grain', 'vignette', 'crop', 'rotate', 'flip',
  'flip-horizontal', 'flip-vertical', 'transform', 'perspective', 'skew',
  'distort', 'warp', 'mesh', 'envelope', 'envelope-open', 'envelope-closed',
  'mail', 'mailbox', 'inbox', 'outbox', 'sent', 'draft', 'archive', 'trash',
  'spam', 'star', 'flag', 'label', 'tag', 'category', 'folder', 'file',
  'document', 'text', 'note', 'note-pin', 'note-text', 'note-code', 'note-image',
  'note-audio', 'note-video', 'calendar', 'clock', 'alarm', 'timer', 'stopwatch',
  'hourglass', 'schedule', 'schedule-2', 'timeline', 'timeline-2', 'history',
  'time', 'date', 'date-time', 'birthday', 'anniversary', 'holiday', 'event',
  'meeting', 'call', 'video-call', 'voice-call', 'chat', 'message', 'comment',
  'discussion', 'forum', 'forum-2', 'forum-3', 'chat-2', 'chat-3', 'bubble',
  'bubble-2', 'bubble-3', 'speech', 'speech-2', 'speech-3', 'quote', 'quote-2',
  'quote-3', 'comment-2', 'comment-3', 'discussion-2', 'discussion-3',
  'forum-4', 'forum-5'
];

const OUTPUT_DIR = 'site/assets/icons';
const OUTPUT_FILE = `${OUTPUT_DIR}/sprite.svg`;

function readTablerIcon(name) {
  const path = `node_modules/@tabler/icons/icons/outline/${name}.svg`;
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

function optimizeSVG(content, name) {
  const optimized = optimize(content, {
    plugins: [
      { name: 'removeAttrs', params: { attrs: ['fill', 'stroke-width'] } },
      { name: 'removeDimensions', params: true },
      { name: 'cleanupAttrs', params: true },
      { name: 'removeTitle', params: true },
      { name: 'removeDesc', params: true },
      { name: 'removeComments', params: true },
      { name: 'removeXMLNS', params: true },
      { name: 'cleanupEnableBackground', params: true },
      { name: 'convertColors', params: { currentColor: true } },
      { name: 'convertPathData', params: { floatPrecision: 2 } },
      { name: 'convertTransform', params: { floatPrecision: 2 } },
      { name: 'removeUnknownsAndDefaults', params: true },
      { name: 'removeNonInheritableGroupAttrs', params: true },
      { name: 'removeUselessStrokeAndFill', params: true },
      { name: 'cleanupNumericValues', params: { floatPrecision: 2 } },
      { name: 'moveElemsAttrsToGroup', params: true },
      { name: 'moveGroupAttrsToElems', params: true },
      { name: 'collapseGroups', params: true },
      { name: 'removeRasterImages', params: true },
      { name: 'mergePaths', params: true },
      { name: 'convertShapeToPath', params: true },
      { name: 'sortAttrs', params: true },
      { name: 'cleanupAttrs', params: { newlines: false } }
    ],
    multipass: true
  }).data;
  
  return optimized
    .replace(/<svg[^>]*>/, `<symbol id="${name}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">`)
    .replace('</svg>', '</symbol>');
}

async function build() {
  console.log('🔨 Construction du sprite SVG...');
  
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">\n';
  let count = 0;
  let skipped = 0;

  // Lucide - télécharger depuis GitHub
  console.log('📥 Téléchargement icônes Lucide...');
  for (const name of LUCIDE_ICONS) {
    try {
      const content = await new Promise((resolve, reject) => {
        https.get(`https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/${name}.svg`, (res) => {
          if (res.statusCode === 200) {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        }).on('error', reject);
      });
      
      const optimized = optimizeSVG(content, `lucide-${name}`);
      sprite += optimized + '\n';
      count++;
      if (count % 25 === 0) console.log(`  ${count} icônes Lucide...`);
    } catch (e) {
      skipped++;
    }
  }

  // Tabler - local
  console.log('📦 Traitement icônes Tabler...');
  for (const name of TABLER_ICONS) {
    const content = readTablerIcon(name);
    if (content) {
      try {
        const optimized = optimizeSVG(content, `tabler-${name}`);
        sprite += optimized + '\n';
        count++;
      } catch (e) {
        skipped++;
      }
    } else {
      skipped++;
    }
  }

  sprite += '</svg>';
  writeFileSync(OUTPUT_FILE, sprite);
  console.log(`✅ Sprite généré: ${OUTPUT_FILE}`);
  console.log(`   Icônes incluses: ${count}`);
  console.log(`   Ignorées: ${skipped}`);
}

build().catch(console.error);
