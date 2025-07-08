// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    allowedHosts: ['devserver-preview--mieten-offenbach.netlify.app']
  }
};

export default config;
