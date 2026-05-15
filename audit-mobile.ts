import { chromium } from 'playwright';

const BASE = 'http://localhost:4321';
const PAGES = ['/', '/about', '/projects', '/blog', '/contact', '/en', '/en/about', '/en/projects', '/en/blog', '/en/contact'];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

  for (const path of PAGES) {
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });

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

      console.log(`\n${path}: horizontalOverflow=${hasHScroll}`);
      if (smallTargets.length > 0) {
        const unique = smallTargets.filter((v, i, a) => a.findIndex(t => t.tag === v.tag && t.text === v.text && t.w === v.w && t.h === v.h) === i);
        console.log('  Small touch targets:');
        unique.slice(0, 10).forEach(t => console.log(`    ${t.tag} "${t.text}" ${t.w}x${t.h}`));
        if (unique.length > 10) console.log(`    ... and ${unique.length - 10} more`);
      }
    } catch (e) {
      console.log(`\n${path}: ERROR ${(e as Error).message}`);
    }
  }

  await browser.close();
}

run();
