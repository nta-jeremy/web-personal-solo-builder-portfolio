import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const SNAP_DIR = 'tests/snapshots';
const REPORT_DIR = 'tests/visual-report';

interface DiffResult {
  name: string;
  viewport: string;
  astroPath: string;
  samplePath: string;
  diffPath: string;
  width: number;
  height: number;
  diffPixels: number;
  diffPercentage: number;
  sameDimensions: boolean;
}

function loadPng(path: string): Promise<PNG> {
  return new Promise((resolve, reject) => {
    const png = new PNG();
    createReadStream(path)
      .pipe(png)
      .on('parsed', () => resolve(png))
      .on('error', reject);
  });
}

function resizeToCanvas(source: PNG, width: number, height: number): Buffer {
  const canvas = Buffer.alloc(width * height * 4, 255);
  for (let y = 0; y < Math.min(source.height, height); y++) {
    for (let x = 0; x < Math.min(source.width, width); x++) {
      const srcIdx = (y * source.width + x) * 4;
      const dstIdx = (y * width + x) * 4;
      canvas[dstIdx] = source.data[srcIdx];
      canvas[dstIdx + 1] = source.data[srcIdx + 1];
      canvas[dstIdx + 2] = source.data[srcIdx + 2];
      canvas[dstIdx + 3] = source.data[srcIdx + 3];
    }
  }
  return canvas;
}

async function compare(name: string, viewport: string): Promise<DiffResult | null> {
  const suffix = viewport === 'mobile' ? '-mobile' : '';
  const astroPath = join(SNAP_DIR, `astro-${name}${suffix}.png`);
  const samplePath = join(SNAP_DIR, `sample-${name}${suffix}.png`);

  if (!existsSync(astroPath) || !existsSync(samplePath)) return null;

  const [img1, img2] = await Promise.all([loadPng(astroPath), loadPng(samplePath)]);

  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);
  const sameDimensions = img1.width === img2.width && img1.height === img2.height;

  const buf1 = resizeToCanvas(img1, width, height);
  const buf2 = resizeToCanvas(img2, width, height);
  const diff = Buffer.alloc(width * height * 4);

  const diffPixels = pixelmatch(
    buf1,
    buf2,
    diff,
    width,
    height,
    {
      threshold: 0.1,
      includeAA: false,
      alpha: 0.1,
      diffColor: [255, 0, 0],
      diffColorAlt: [0, 255, 0],
    }
  );

  const diffPng = new PNG({ width, height });
  diffPng.data = diff;
  const diffPath = join(REPORT_DIR, `diff-${name}${suffix}.png`);
  diffPng.pack().pipe(createWriteStream(diffPath));

  const aligned1 = new PNG({ width, height });
  aligned1.data = buf1;
  aligned1.pack().pipe(createWriteStream(join(REPORT_DIR, `aligned-astro-${name}${suffix}.png`)));

  const aligned2 = new PNG({ width, height });
  aligned2.data = buf2;
  aligned2.pack().pipe(createWriteStream(join(REPORT_DIR, `aligned-sample-${name}${suffix}.png`)));

  const totalPixels = width * height;
  const diffPercentage = (diffPixels / totalPixels) * 100;

  return {
    name,
    viewport,
    astroPath,
    samplePath,
    diffPath: `diff-${name}${suffix}.png`,
    width,
    height,
    diffPixels,
    diffPercentage,
    sameDimensions,
  };
}

async function generateReport(results: DiffResult[]) {
  mkdirSync(REPORT_DIR, { recursive: true });

  const desktopRows = results
    .filter(r => r.viewport === 'desktop')
    .map(
      (r) => `
    <tr>
      <td>${r.name}</td>
      <td>${r.width}x${r.height}</td>
      <td>${r.sameDimensions ? 'Yes' : '<strong style="color:red">No</strong>'}</td>
      <td>${r.diffPixels.toLocaleString()}</td>
      <td><strong style="color:${r.diffPercentage < 1 ? 'green' : r.diffPercentage < 5 ? 'orange' : 'red'}">${r.diffPercentage.toFixed(2)}%</strong></td>
      <td><img src="aligned-astro-${r.name}.png" width="280" /></td>
      <td><img src="aligned-sample-${r.name}.png" width="280" /></td>
      <td><img src="${r.diffPath}" width="280" /></td>
    </tr>
  `
    )
    .join('');

  const mobileRows = results
    .filter(r => r.viewport === 'mobile')
    .map(
      (r) => `
    <tr>
      <td>${r.name}</td>
      <td>${r.width}x${r.height}</td>
      <td>${r.sameDimensions ? 'Yes' : '<strong style="color:red">No</strong>'}</td>
      <td>${r.diffPixels.toLocaleString()}</td>
      <td><strong style="color:${r.diffPercentage < 1 ? 'green' : r.diffPercentage < 5 ? 'orange' : 'red'}">${r.diffPercentage.toFixed(2)}%</strong></td>
      <td><img src="aligned-astro-${r.name}-mobile.png" width="200" /></td>
      <td><img src="aligned-sample-${r.name}-mobile.png" width="200" /></td>
      <td><img src="${r.diffPath}" width="200" /></td>
    </tr>
  `
    )
    .join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Visual Regression Report</title>
<style>
body{font-family:Inter,system-ui,sans-serif;margin:24px;background:#0f0f0f;color:#e5e5e5}
h1{margin:0 0 8px}h2{margin:32px 0 12px;color:#ccc}p{color:#888;margin:0 0 24px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border:1px solid #333;padding:10px;text-align:left;vertical-align:top}
th{background:#1a1a1a;color:#fff}
img{max-width:100%;border-radius:6px;border:1px solid #333}
tr:hover{background:#1a1a1a}
.status-ok{color:#4ade80}.status-warn{color:#fbbf24}.status-fail{color:#f87171}
.summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.summary-card{background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:16px}
.summary-card h3{margin:0 0 8px;font-size:14px;color:#888}
.summary-card .value{font-size:28px;font-weight:600;margin:0}
</style></head><body>
<h1>Visual Regression Report</h1>
<p>Generated: ${new Date().toLocaleString()}</p>

<div class="summary">
  <div class="summary-card">
    <h3>Desktop Home Diff</h3>
    <p class="value" style="color:${results.find(r=>r.name==='home'&&r.viewport==='desktop')?.diffPercentage! < 5 ? 'green' : 'red'}">${results.find(r=>r.name==='home'&&r.viewport==='desktop')?.diffPercentage.toFixed(2) ?? 'N/A'}%</p>
  </div>
  <div class="summary-card">
    <h3>Mobile Home Diff</h3>
    <p class="value" style="color:${results.find(r=>r.name==='home'&&r.viewport==='mobile')?.diffPercentage! < 5 ? 'green' : 'red'}">${results.find(r=>r.name==='home'&&r.viewport==='mobile')?.diffPercentage.toFixed(2) ?? 'N/A'}%</p>
  </div>
  <div class="summary-card">
    <h3>Total Comparisons</h3>
    <p class="value">${results.length}</p>
  </div>
</div>

<h2>Desktop Comparisons</h2>
<table>
  <tr><th>Page</th><th>Dimensions</th><th>Same Size</th><th>Diff Pixels</th><th>Diff %</th><th>Astro Site</th><th>Design Sample</th><th>Diff Overlay</th></tr>
  ${desktopRows || '<tr><td colspan="8" style="color:#888">No desktop comparisons available</td></tr>'}
</table>

<h2>Mobile Comparisons</h2>
<table>
  <tr><th>Page</th><th>Dimensions</th><th>Same Size</th><th>Diff Pixels</th><th>Diff %</th><th>Astro Site</th><th>Design Sample</th><th>Diff Overlay</th></tr>
  ${mobileRows || '<tr><td colspan="8" style="color:#888">No mobile comparisons available</td></tr>'}
</table>
</body></html>`;

  const reportPath = join(REPORT_DIR, 'index.html');
  const writeStream = createWriteStream(reportPath);
  writeStream.write(html);
  writeStream.end();

  console.log(`\nReport: ${reportPath}`);
  console.log(`Open: file://${process.cwd()}/${reportPath}\n`);
}

async function main() {
  const comparisons = [
    { name: 'home', viewport: 'desktop' },
    { name: 'home', viewport: 'mobile' },
  ];

  const results: DiffResult[] = [];

  for (const { name, viewport } of comparisons) {
    const res = await compare(name, viewport);
    if (res) {
      results.push(res);
      console.log(
        `${name} (${viewport}): ${res.diffPercentage.toFixed(2)}% diff (${res.diffPixels.toLocaleString()} pixels)${res.sameDimensions ? '' : ' [SIZE MISMATCH]'}`
      );
    } else {
      console.log(`${name} (${viewport}): skipped (missing sample)`);
    }
  }

  await generateReport(results);

  if (results.length > 0) {
    const avgDiff = results.reduce((sum, r) => sum + r.diffPercentage, 0) / results.length;
    console.log(`\nAverage diff: ${avgDiff.toFixed(2)}%`);
    console.log(`Status: ${avgDiff < 1 ? 'PASS (close match)' : avgDiff < 5 ? 'WARNING (significant diff)' : 'FAIL (major mismatch)'}`);
  }
}

main().catch(console.error);
