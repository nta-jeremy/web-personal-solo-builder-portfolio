const fs = require('fs');
const PNG = require('pngjs').PNG;

function loadPng(path) {
  return new Promise((resolve, reject) => {
    const png = new PNG();
    fs.createReadStream(path)
      .pipe(png)
      .on('parsed', () => resolve(png))
      .on('error', reject);
  });
}

async function main() {
  const [astro, sample] = await Promise.all([
    loadPng('tests/snapshots/astro-home-viewport.png'),
    loadPng('tests/snapshots/sample-home-viewport.png'),
  ]);

  const w = astro.width;
  const h = astro.height;
  const THRESHOLD = 30;

  // Find diff bounding box
  let minX = w, maxX = 0, minY = h, maxY = 0;
  let totalDiff = 0;

  const bands = [
    { name: 'Top (0-15%)', y1: 0, y2: Math.floor(h * 0.15) },
    { name: 'Upper-mid (15-40%)', y1: Math.floor(h * 0.15), y2: Math.floor(h * 0.4) },
    { name: 'Mid (40-60%)', y1: Math.floor(h * 0.4), y2: Math.floor(h * 0.6) },
    { name: 'Lower-mid (60-85%)', y1: Math.floor(h * 0.6), y2: Math.floor(h * 0.85) },
    { name: 'Bottom (85-100%)', y1: Math.floor(h * 0.85), y2: h },
  ];

  for (const band of bands) {
    let diffPixels = 0;
    let bandMinX = w, bandMaxX = 0;
    
    for (let y = band.y1; y < band.y2; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const rDiff = Math.abs(astro.data[idx] - sample.data[idx]);
        const gDiff = Math.abs(astro.data[idx + 1] - sample.data[idx + 1]);
        const bDiff = Math.abs(astro.data[idx + 2] - sample.data[idx + 2]);
        
        if (rDiff > THRESHOLD || gDiff > THRESHOLD || bDiff > THRESHOLD) {
          diffPixels++;
          bandMinX = Math.min(bandMinX, x);
          bandMaxX = Math.max(bandMaxX, x);
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }
    
    const total = (band.y2 - band.y1) * w;
    const pct = (diffPixels / total) * 100;
    console.log(`${band.name}: ${pct.toFixed(2)}% (${diffPixels.toLocaleString()} pixels) x=${bandMinX}-${bandMaxX}`);
  }

  console.log(`\nOverall diff bounding box: x=${minX}-${maxX}, y=${minY}-${maxY}`);
  console.log(`Overall diff: ${((totalDiff / (w * h)) * 100).toFixed(2)}%`);
}

main().catch(console.error);
