import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Remove base path for development, use /mieten for production
const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
		}),
		paths: {
			base: dev ? '' : '/rent-in-germany-offenbach'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
