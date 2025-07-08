// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  ...(process.env.NODE_ENV === 'development'
    ? {
        server: {
          host: true,
          allowedHosts: ['devserver-preview--mieten-offenbach.netlify.app']
        }
      }
    : {})
};

export default config;
