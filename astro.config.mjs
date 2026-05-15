import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://jeremytech.io.vn',
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), mdx(), sitemap(), pagefind()],
  compressHTML: true,
  inlineStylesheets: 'auto',
  prefetch: true,
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    prefixDefaultLocale: false,
    fallback: { en: 'vi' },
    fallbackType: 'rewrite',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
