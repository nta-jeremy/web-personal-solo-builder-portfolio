import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();

  // Capture Astro site viewport only
  const astroPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await astroPage.goto('http://localhost:4321/');
  await astroPage.waitForLoadState('networkidle');
  await astroPage.waitForTimeout(2000);
  await astroPage.screenshot({ path: 'tests/snapshots/astro-home-viewport.png' });

  // Capture sample viewport only
  const samplePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await samplePage.goto('http://localhost:3333/Jeremy%20Website%20Overview.html');
  await samplePage.waitForLoadState('networkidle');
  await samplePage.waitForSelector('#root', { timeout: 10000 });
  await samplePage.waitForTimeout(3000);
  await samplePage.screenshot({ path: 'tests/snapshots/sample-home-viewport.png' });

  await browser.close();
  console.log('Viewport screenshots captured');
}

capture().catch(console.error);
