const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
const staticFiles = [
  'index.html',
  'style.css',
  'script.js',
  'logo.png',
  'qr_code.png',
  'manifest.json',
  'sw.js'
];

fs.mkdirSync(output, { recursive: true });
for (const file of staticFiles) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

const assets = path.join(root, 'assets');
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(output, 'assets'), { recursive: true });
}
