import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:4321/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const els = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    return links
      .map(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          text: el.innerText?.slice(0, 40) || '',
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          display: style.display,
          hidden: style.display === 'none' || style.visibility === 'hidden',
        };
      })
      .filter(l => l.text.includes('Đọc') || l.text.includes('Read'));
  });

  console.log(JSON.stringify(els, null, 2));
  await browser.close();
}
run();
