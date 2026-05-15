import { chromium } from 'playwright';
async function main() {
  const browser = await chromium.launch();
  
  const p1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p1.goto('http://localhost:4321/');
  await p1.waitForLoadState('networkidle');
  await p1.waitForTimeout(3000);
  const bg = await p1.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  console.log('Astro body bg:', bg);
  await p1.screenshot({ path: 'tests/snapshots/astro-home-fixed.png' });
  
  const p2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p2.goto('http://localhost:3333/Jeremy%20Website%20Overview.html');
  await p2.waitForLoadState('networkidle');
  await p2.waitForSelector('#root', { timeout: 10000 });
  await p2.waitForTimeout(3000);
  await p2.screenshot({ path: 'tests/snapshots/sample-home-fixed.png' });
  
  await browser.close();
  console.log('Done');
}
main().catch(console.error);
