import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),
    paths: {
      base: dev ? '' : '/rent-in-germany-offenbach'
    },
    appDir: '_app'
  },
  preprocess: vitePreprocess()
};

export default config;
