import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { join } from 'node:path';

const proj_root = join(import.meta.url.replace('file://', ''), '../../..');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html',
			pages: join(proj_root, 'docs'),
			assets: join(proj_root, 'docs'),
		}),
		paths: { base: '/suru' },
		alias: {
			$comp: './src/comp',
			$styles: './src/styles',
		},
	},
};

export default config;
