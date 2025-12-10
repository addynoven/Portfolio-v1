#!/usr/bin/env node
/**
 * ReactBits Component Installer
 * 
 * A proper installer that downloads and syncs components from the ReactBits 
 * GitHub repository. Features:
 * - Auto-detects existing components (no redundant API calls)
 * - Tracks new components added to ReactBits
 * - Maintains a local manifest for quick sync checks
 * - Reports what's new since last run
 * 
 * Usage: 
 *   node scripts/download-reactbits.js           # Download missing components
 *   node scripts/download-reactbits.js --check   # Just check for new components
 *   node scripts/download-reactbits.js --force   # Re-download all components
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const GITHUB_API_BASE = 'https://api.github.com/repos/DavidHDev/react-bits/contents/src/content';
const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'reactbits');
const MANIFEST_PATH = path.join(__dirname, '..', 'components', 'reactbits', '.manifest.json');
const TRACKER_PATH = path.join(__dirname, '..', 'docs', 'REACTBITS_TRACKER.md');

const CATEGORIES = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'];

// Parse CLI arguments
const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const FORCE_DOWNLOAD = args.includes('--force');

// Track results
const results = {
  downloaded: [],
  skipped: [],
  failed: [],
  newComponents: []
};

// ============================================================================
// Manifest Management - Track what's available in ReactBits
// ============================================================================

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch (e) {
      console.log('⚠️  Manifest corrupted, will rebuild');
    }
  }
  return { 
    lastUpdated: null, 
    components: {},
    totalCount: 0
  };
}

function saveManifest(manifest) {
  manifest.lastUpdated = new Date().toISOString();
  manifest.totalCount = Object.values(manifest.components).flat().length;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

// ============================================================================
// Local Component Detection
// ============================================================================

function getExistingComponents() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    return new Set();
  }
  const files = fs.readdirSync(OUTPUT_DIR);
  const components = files
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace('.tsx', ''));
  return new Set(components);
}

// ============================================================================
// GitHub API Helpers
// ============================================================================

function fetch(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'ReactBits-Installer/2.0',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else if (res.statusCode === 403) {
          reject(new Error('Rate limit exceeded. Try again in ~1 hour or use a GitHub token.'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'ReactBits-Installer/2.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// ============================================================================
// Component Processing
// ============================================================================

function convertToTypeScript(code) {
  // Add "use client" directive at the top
  let converted = '"use client";\n\n';
  
  // Add the original code
  converted += code;
  
  // Replace .jsx extension imports with nothing (we'll use .tsx)
  converted = converted.replace(/from\s+['"]\.\/([^'"]+)\.jsx['"]/g, "from './$1'");
  
  return converted;
}

async function downloadComponent(category, componentName) {
  try {
    // Get the component folder contents
    const folderUrl = `${GITHUB_API_BASE}/${category}/${componentName}`;
    const files = await fetch(folderUrl);
    
    // Find the main component file (.jsx)
    const jsxFile = files.find(f => f.name.endsWith('.jsx') && !f.name.includes('.demo'));
    
    if (!jsxFile) {
      console.log(`  ⚠️  No .jsx file found for ${componentName}`);
      results.failed.push({ name: componentName, reason: 'No .jsx file' });
      return false;
    }
    
    // Download the file content
    const code = await fetchRaw(jsxFile.download_url);
    
    // Convert to TypeScript format
    const tsxCode = convertToTypeScript(code);
    
    // Save to file
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outputPath, tsxCode);
    
    console.log(`  ✅ Downloaded ${componentName}`);
    results.downloaded.push(componentName);
    return true;
    
  } catch (error) {
    console.log(`  ❌ Failed ${componentName}: ${error.message}`);
    results.failed.push({ name: componentName, reason: error.message });
    return false;
  }
}

// ============================================================================
// Main Sync Logic
// ============================================================================

async function fetchRemoteComponents() {
  console.log('\n🔍 Fetching component list from ReactBits...');
  
  const remoteComponents = {};
  
  for (const category of CATEGORIES) {
    try {
      const components = await fetch(`${GITHUB_API_BASE}/${category}`);
      remoteComponents[category] = components
        .filter(c => c.type === 'dir')
        .map(c => c.name);
      console.log(`  📁 ${category}: ${remoteComponents[category].length} components`);
      await new Promise(r => setTimeout(r, 100)); // Small delay between categories
    } catch (error) {
      console.error(`  ❌ Failed to fetch ${category}: ${error.message}`);
      remoteComponents[category] = [];
    }
  }
  
  return remoteComponents;
}

function detectNewComponents(oldManifest, newComponents) {
  const newOnes = [];
  
  for (const [category, components] of Object.entries(newComponents)) {
    const oldList = oldManifest.components[category] || [];
    for (const comp of components) {
      if (!oldList.includes(comp)) {
        newOnes.push({ category, name: comp });
      }
    }
  }
  
  return newOnes;
}

async function syncComponents() {
  // Load existing manifest
  const manifest = loadManifest();
  const existingComponents = getExistingComponents();
  
  console.log(`📂 Found ${existingComponents.size} components locally`);
  
  if (manifest.lastUpdated) {
    console.log(`📋 Last sync: ${new Date(manifest.lastUpdated).toLocaleString()}`);
  }
  
  // Fetch remote component list
  const remoteComponents = await fetchRemoteComponents();
  const totalRemote = Object.values(remoteComponents).flat().length;
  
  console.log(`\n📊 ReactBits Total: ${totalRemote} components`);
  
  // Detect new components since last run
  const newComponents = detectNewComponents(manifest, remoteComponents);
  if (newComponents.length > 0) {
    console.log(`\n🆕 NEW since last sync: ${newComponents.length} components`);
    newComponents.forEach(c => {
      console.log(`   ✨ ${c.category}/${c.name}`);
      results.newComponents.push(c.name);
    });
  }
  
  // Update manifest with latest remote state
  manifest.components = remoteComponents;
  saveManifest(manifest);
  
  if (CHECK_ONLY) {
    console.log('\n✅ Check complete (--check mode, no downloads)');
    return;
  }
  
  // Download missing components
  console.log('\n📥 Downloading missing components...');
  
  for (const [category, components] of Object.entries(remoteComponents)) {
    console.log(`\n📁 ${category}`);
    console.log('─'.repeat(40));
    
    for (const componentName of components) {
      if (!FORCE_DOWNLOAD && existingComponents.has(componentName)) {
        console.log(`  ⏭️  Skipping ${componentName} (already exists)`);
        results.skipped.push(componentName);
      } else {
        await downloadComponent(category, componentName);
        await new Promise(r => setTimeout(r, 200)); // Rate limiting delay
      }
    }
  }
}

// ============================================================================
// Tracker Update
// ============================================================================

function updateTracker() {
  console.log('\n📝 Updating tracker...');
  
  const now = new Date().toISOString();
  const existingComponents = getExistingComponents();
  
  let tracker = fs.readFileSync(TRACKER_PATH, 'utf-8');
  
  // Add download summary at the top
  const summary = `
## 🔄 Last Sync: ${now}

| Status | Count |
|--------|-------|
| Total Available | ${Object.values(loadManifest().components).flat().length} |
| Downloaded | ${existingComponents.size} |
| New This Run | ${results.downloaded.length} |
| Failed | ${results.failed.length} |

${results.newComponents.length > 0 ? `### 🆕 New Components Detected
${results.newComponents.map(c => `- ✨ ${c}`).join('\n')}
` : ''}
${results.downloaded.length > 0 ? `### ✅ Downloaded This Run
${results.downloaded.map(c => `- ✅ ${c}`).join('\n')}
` : ''}
${results.failed.length > 0 ? `### ❌ Failed
${results.failed.map(c => `- ❌ ${c.name}: ${c.reason}`).join('\n')}
` : ''}
---
`;
  
  // Insert after the title
  const titleEnd = tracker.indexOf('\n\n', tracker.indexOf('# ReactBits'));
  tracker = tracker.slice(0, titleEnd) + '\n' + summary + tracker.slice(titleEnd);
  
  fs.writeFileSync(TRACKER_PATH, tracker);
  console.log('✅ Tracker updated!');
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║            🎨 ReactBits Component Installer v2.0              ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  
  if (CHECK_ONLY) {
    console.log('📌 Mode: Check only (no downloads)');
  } else if (FORCE_DOWNLOAD) {
    console.log('📌 Mode: Force re-download all');
  } else {
    console.log('📌 Mode: Sync (download missing only)');
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  try {
    await syncComponents();
    
    if (!CHECK_ONLY) {
      updateTracker();
    }
    
    // Final summary
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                      📊 Final Summary                         ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log(`  ✅ Downloaded: ${results.downloaded.length}`);
    console.log(`  ⏭️  Skipped:    ${results.skipped.length}`);
    console.log(`  ❌ Failed:     ${results.failed.length}`);
    if (results.newComponents.length > 0) {
      console.log(`  🆕 New:        ${results.newComponents.length}`);
    }
    console.log('');
    console.log('🎉 Done!');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
