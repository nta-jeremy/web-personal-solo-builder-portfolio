const fs = require('fs');
const { PNG } = require('pngjs');

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
    loadPng('tests/snapshots/astro-home-fixed.png'),
    loadPng('tests/snapshots/sample-home-fixed.png'),
  ]);

  const w = astro.width;
  const h = astro.height;
  const THRESHOLD = 30;

  const bands = [
    { name: 'Top sidebar area (0-10%)', y1: 0, y2: Math.floor(h * 0.1) },
    { name: 'Hero section (10-35%)', y1: Math.floor(h * 0.1), y2: Math.floor(h * 0.35) },
    { name: 'Cards area (35-60%)', y1: Math.floor(h * 0.35), y2: Math.floor(h * 0.6) },
    { name: 'Latest artifact (60-85%)', y1: Math.floor(h * 0.6), y2: Math.floor(h * 0.85) },
    { name: 'Bottom area (85-100%)', y1: Math.floor(h * 0.85), y2: h },
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
        }
      }
    }
    
    const total = (band.y2 - band.y1) * w;
    const pct = (diffPixels / total) * 100;
    console.log(`${band.name}: ${pct.toFixed(2)}% x=${bandMinX}-${bandMaxX}`);
  }
}
main().catch(console.error);
