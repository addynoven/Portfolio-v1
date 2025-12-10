#!/usr/bin/env node
/**
 * ReactBits Component Downloader
 * 
 * Downloads all components from the ReactBits GitHub repository
 * and saves them to components/reactbits/
 * 
 * Usage: node scripts/download-reactbits.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_API_BASE = 'https://api.github.com/repos/DavidHDev/react-bits/contents/src/content';
const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'reactbits');
const TRACKER_PATH = path.join(__dirname, '..', 'docs', 'REACTBITS_TRACKER.md');

const CATEGORIES = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'];

// Auto-detect existing components from filesystem
function getExistingComponents() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    return new Set();
  }
  const files = fs.readdirSync(OUTPUT_DIR);
  const components = files
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace('.tsx', ''));
  console.log(`📂 Found ${components.length} existing components locally`);
  return new Set(components);
}

// Track results
const results = {
  downloaded: [],
  skipped: [],
  failed: []
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'ReactBits-Downloader',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'ReactBits-Downloader' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function convertToTypeScript(code, componentName) {
  // Add "use client" directive at the top
  let converted = '"use client";\n\n';
  
  // Add the original code
  converted += code;
  
  // Replace .jsx extension imports with nothing (we'll use .tsx)
  converted = converted.replace(/from\s+['"]\.\/([^'"]+)\.jsx['"]/g, "from './$1'");
  
  return converted;
}

async function downloadComponent(category, componentName, existingComponents) {
  if (existingComponents.has(componentName)) {
    console.log(`  ⏭️  Skipping ${componentName} (already exists)`);
    results.skipped.push(componentName);
    return;
  }
  
  try {
    // Get the component folder contents
    const folderUrl = `${GITHUB_API_BASE}/${category}/${componentName}`;
    const files = await fetch(folderUrl);
    
    // Find the main component file (.jsx)
    const jsxFile = files.find(f => f.name.endsWith('.jsx') && !f.name.includes('.demo'));
    
    if (!jsxFile) {
      console.log(`  ⚠️  No .jsx file found for ${componentName}`);
      results.failed.push({ name: componentName, reason: 'No .jsx file' });
      return;
    }
    
    // Download the file content
    const code = await fetchRaw(jsxFile.download_url);
    
    // Convert to TypeScript format
    const tsxCode = convertToTypeScript(code, componentName);
    
    // Save to file
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outputPath, tsxCode);
    
    console.log(`  ✅ Downloaded ${componentName}`);
    results.downloaded.push(componentName);
    
  } catch (error) {
    console.log(`  ❌ Failed ${componentName}: ${error.message}`);
    results.failed.push({ name: componentName, reason: error.message });
  }
}

async function downloadCategory(category, existingComponents) {
  console.log(`\n📁 ${category}`);
  console.log('─'.repeat(40));
  
  try {
    const components = await fetch(`${GITHUB_API_BASE}/${category}`);
    
    for (const component of components) {
      if (component.type === 'dir') {
        await downloadComponent(category, component.name, existingComponents);
        // Add delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200));
      }
    }
  } catch (error) {
    console.error(`Failed to fetch ${category}: ${error.message}`);
  }
}

function updateTracker() {
  console.log('\n📝 Updating tracker...');
  
  const now = new Date().toISOString();
  
  let tracker = fs.readFileSync(TRACKER_PATH, 'utf-8');
  
  // Add download summary at the top
  const summary = `
## 🔄 Last Download: ${now}

| Status | Count |
|--------|-------|
| Downloaded | ${results.downloaded.length} |
| Skipped (already exists) | ${results.skipped.length} |
| Failed | ${results.failed.length} |

### Downloaded Components
${results.downloaded.map(c => `- ✅ ${c}`).join('\n') || '_(none)_'}

### Failed Components
${results.failed.map(c => `- ❌ ${c.name}: ${c.reason}`).join('\n') || '_(none)_'}

---
`;
  
  // Insert after the title
  const titleEnd = tracker.indexOf('\n\n', tracker.indexOf('# ReactBits'));
  tracker = tracker.slice(0, titleEnd) + '\n' + summary + tracker.slice(titleEnd);
  
  fs.writeFileSync(TRACKER_PATH, tracker);
  console.log('✅ Tracker updated!');
}

async function main() {
  console.log('🚀 ReactBits Component Downloader');
  console.log('═'.repeat(40));
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Auto-detect what we already have
  const existingComponents = getExistingComponents();
  
  // Download all categories
  for (const category of CATEGORIES) {
    await downloadCategory(category, existingComponents);
  }
  
  // Update tracker
  updateTracker();
  
  // Final summary
  console.log('\n' + '═'.repeat(40));
  console.log('📊 Final Summary');
  console.log('═'.repeat(40));
  console.log(`✅ Downloaded: ${results.downloaded.length}`);
  console.log(`⏭️  Skipped: ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('\n🎉 Done!');
}

main().catch(console.error);
