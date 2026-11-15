// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://frencia.fit',
  integrations: [sitemap()],

  // El CSS entra en el HTML: asi no bloquea el primer render con otra peticion.
  build: {
    inlineStylesheets: 'always'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
