// @ts-check
import { defineConfig } from 'astro/config';

// www is the established canonical host: the apex already 301s to www in production.
export default defineConfig({
  site: 'https://www.orchardcabo.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  image: { responsiveStyles: true },
  devToolbar: { enabled: false },
});
