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
    loadPng('tests/snapshots/astro-home-viewport.png'),
    loadPng('tests/snapshots/sample-home-viewport.png'),
  ]);

  const w = astro.width;
  const h = astro.height;

  // Check background color at several points
  const points = [
    { x: 50, y: 50, label: 'Top-left bg' },
    { x: 700, y: 100, label: 'Top-center bg' },
    { x: 1350, y: 50, label: 'Top-right bg' },
    { x: 300, y: 300, label: 'Content area' },
    { x: 700, y: 400, label: 'Center content' },
    { x: 300, y: 800, label: 'Lower area' },
    { x: 50, y: 850, label: 'Bottom-left' },
  ];

  console.log('Pixel comparison (R,G,B):');
  console.log('Point                | Astro              | Sample             | Diff');
  console.log('---------------------|--------------------|--------------------|-----');
  
  for (const p of points) {
    const idx = (p.y * w + p.x) * 4;
    const ar = astro.data[idx], ag = astro.data[idx+1], ab = astro.data[idx+2];
    const sr = sample.data[idx], sg = sample.data[idx+1], sb = sample.data[idx+2];
    const diff = Math.abs(ar-sr) + Math.abs(ag-sg) + Math.abs(ab-sb);
    console.log(
      `${p.label.padEnd(20)} | ${String(ar).padStart(3)},${String(ag).padStart(3)},${String(ab).padStart(3)} | ${String(sr).padStart(3)},${String(sg).padStart(3)},${String(sb).padStart(3)} | ${diff}`
    );
  }

  // Check if it's mostly text/font anti-aliasing by looking at non-white/non-bg pixels
  let astroNonBg = 0, sampleNonBg = 0;
  const BG_R = 244, BG_G = 241, BG_B = 234; // #f4f1ea
  
  for (let y = 0; y < h; y += 10) {
    for (let x = 0; x < w; x += 10) {
      const idx = (y * w + x) * 4;
      const aDiff = Math.abs(astro.data[idx] - BG_R) + Math.abs(astro.data[idx+1] - BG_G) + Math.abs(astro.data[idx+2] - BG_B);
      const sDiff = Math.abs(sample.data[idx] - BG_R) + Math.abs(sample.data[idx+1] - BG_G) + Math.abs(sample.data[idx+2] - BG_B);
      if (aDiff > 30) astroNonBg++;
      if (sDiff > 30) sampleNonBg++;
    }
  }
  
  console.log(`\nNon-background pixel count (sampled every 10px):`);
  console.log(`Astro: ${astroNonBg}, Sample: ${sampleNonBg}`);
  console.log(`Astro has ${astroNonBg > sampleNonBg ? 'MORE' : 'LESS'} content pixels`);
}

main().catch(console.error);
