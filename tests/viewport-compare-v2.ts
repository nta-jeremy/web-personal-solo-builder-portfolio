import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4321/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000); // 5s wait
  
  // Check body background color via JS
  const bgColor = await page.evaluate(() => {
    const body = document.body;
    const styles = window.getComputedStyle(body);
    return {
      backgroundColor: styles.backgroundColor,
      background: styles.background,
      bodyClass: body.className,
      htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
    };
  });
  console.log('Astro body styles:', JSON.stringify(bgColor, null, 2));
  
  await page.screenshot({ path: 'tests/snapshots/astro-home-v2.png' });
  
  // Also capture sample
  const sPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await sPage.goto('http://localhost:3333/Jeremy%20Website%20Overview.html');
  await sPage.waitForLoadState('networkidle');
  await sPage.waitForSelector('#root', { timeout: 10000 });
  await sPage.waitForTimeout(5000);
  
  const sBg = await sPage.evaluate(() => {
    const body = document.body;
    const styles = window.getComputedStyle(body);
    return {
      backgroundColor: styles.backgroundColor,
      background: styles.background,
      bodyClass: body.className,
    };
  });
  console.log('Sample body styles:', JSON.stringify(sBg, null, 2));
  
  await sPage.screenshot({ path: 'tests/snapshots/sample-home-v2.png' });
  
  await browser.close();
}
capture().catch(console.error);
