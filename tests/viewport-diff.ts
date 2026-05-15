import { createReadStream, createWriteStream } from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

function loadPng(path: string): Promise<PNG> {
  return new Promise((resolve, reject) => {
    const png = new PNG();
    createReadStream(path)
      .pipe(png)
      .on('parsed', () => resolve(png))
      .on('error', reject);
  });
}

async function main() {
  const [img1, img2] = await Promise.all([
    loadPng('tests/snapshots/astro-home-viewport.png'),
    loadPng('tests/snapshots/sample-home-viewport.png'),
  ]);

  const diff = Buffer.alloc(img1.width * img1.height * 4);
  const diffPixels = pixelmatch(
    img1.data, img2.data, diff,
    img1.width, img1.height,
    { threshold: 0.1, includeAA: false, alpha: 0.1, diffColor: [255,0,0], diffColorAlt: [0,255,0] }
  );

  const diffPng = new PNG({ width: img1.width, height: img1.height });
  diffPng.data = diff;
  diffPng.pack().pipe(createWriteStream('tests/visual-report/viewport-diff-home.png'));

  const total = img1.width * img1.height;
  console.log(`Viewport-only diff: ${((diffPixels/total)*100).toFixed(2)}% (${diffPixels.toLocaleString()} pixels)`);
}
main().catch(console.error);
