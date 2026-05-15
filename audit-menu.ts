import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:4321/about', { waitUntil: 'networkidle' });
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(500);

  const smallTargets = await page.evaluate(() => {
    const interactive = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    const bad: Array<{tag: string, text: string, w: number, h: number}> = [];
    interactive.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return;
      if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        bad.push({
          tag: el.tagName,
          text: (el as HTMLElement).innerText?.slice(0, 30) || (el as HTMLElement).ariaLabel || '',
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    });
    return bad;
  });

  console.log('Small touch targets in mobile menu:');
  smallTargets.forEach(t => console.log(`  ${t.tag} "${t.text}" ${t.w}x${t.h}`));
  await browser.close();
}
run();
