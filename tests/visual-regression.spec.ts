import { test, expect } from '@playwright/test';

const SAMPLE_URL = 'http://localhost:3333';

// Desktop comparisons — pages where sample exists
const DESKTOP_COMPARISONS = [
  { name: 'home', sitePath: '/', samplePath: '/Jeremy%20Website%20Overview.html', sampleSelector: '#root' },
];

// Mobile comparisons — pages where mobile sample exists
const MOBILE_COMPARISONS = [
  { name: 'home', sitePath: '/', samplePath: '/Jeremy%20Website%20Overview.html', sampleSelector: '#root' },
];

// All site pages for standalone screenshots
const ALL_PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'projects', path: '/projects' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
  { name: '404', path: '/404' },
  { name: 'en-404', path: '/en/404' },
  { name: 'project-detail', path: '/projects/portfolio/' },
];

test.describe('Desktop Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  for (const cmp of DESKTOP_COMPARISONS) {
    test(`${cmp.name}: screenshot both versions`, async ({ page }) => {
      // Screenshot Astro site
      await page.goto(cmp.sitePath);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/snapshots/astro-${cmp.name}.png`,
        fullPage: true,
      });

      // Screenshot sample
      const samplePage = await page.context().newPage();
      await samplePage.setViewportSize({ width: 1440, height: 900 });
      await samplePage.goto(`${SAMPLE_URL}${cmp.samplePath}`);
      await samplePage.waitForLoadState('networkidle');
      await samplePage.waitForSelector(cmp.sampleSelector, { timeout: 10000 });
      await samplePage.waitForTimeout(2000);

      await samplePage.screenshot({
        path: `tests/snapshots/sample-${cmp.name}.png`,
        fullPage: true,
      });
      await samplePage.close();
    });
  }
});

test.describe('Mobile Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
  });

  for (const cmp of MOBILE_COMPARISONS) {
    test(`${cmp.name}: screenshot both versions @mobile`, async ({ page }) => {
      // Screenshot Astro site mobile
      await page.goto(cmp.sitePath);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/snapshots/astro-${cmp.name}-mobile.png`,
        fullPage: true,
      });

      // Screenshot sample mobile
      const samplePage = await page.context().newPage();
      await samplePage.setViewportSize({ width: 375, height: 812 });
      await samplePage.goto(`${SAMPLE_URL}${cmp.samplePath}`);
      await samplePage.waitForLoadState('networkidle');
      await samplePage.waitForSelector(cmp.sampleSelector, { timeout: 10000 });
      await samplePage.waitForTimeout(2000);

      await samplePage.screenshot({
        path: `tests/snapshots/sample-${cmp.name}-mobile.png`,
        fullPage: true,
      });
      await samplePage.close();
    });
  }
});

test.describe('Standalone Site Screenshots', () => {
  for (const p of ALL_PAGES) {
    test(`desktop screenshot ${p.name}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/snapshots/site-${p.name}-desktop.png`,
        fullPage: true,
      });
    });

    test(`mobile screenshot ${p.name} @mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: `tests/snapshots/site-${p.name}-mobile.png`,
        fullPage: true,
      });
    });
  }
});
