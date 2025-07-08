// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    host: true, // allows external access
    // Optional: customize HMR client connection if needed
    hmr: {
      protocol: 'wss',
      host: 'devserver-preview--mieten-offenbach.netlify.app',
    }
  }
};

export default config;
