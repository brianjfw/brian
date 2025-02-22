const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeIcon(inputPath, size) {
  try {
    const tempPath = inputPath + '.temp';
    await sharp(inputPath)
      .resize(size, size)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(tempPath);
    
    await fs.unlink(inputPath);
    await fs.rename(tempPath, inputPath);
    console.log(`Optimized: ${inputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function main() {
  const icons = [
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 16, name: 'favicon-16x16.jpg' },
    { size: 32, name: 'favicon-32x32.jpg' },
  ];

  for (const icon of icons) {
    const inputPath = path.join('public', icon.name);
    await optimizeIcon(inputPath, icon.size);
  }
}

main().catch(console.error); 