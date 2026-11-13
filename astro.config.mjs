import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(process.env.SITE_URL ? { site: process.env.SITE_URL } : {}),
  ...(process.env.SITE_BASE ? { base: process.env.SITE_BASE } : {}),
});
