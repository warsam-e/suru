import { sveltekit } from '@sveltejs/kit/vite';
import { type ServerOptions, defineConfig } from 'vite';

const opts: ServerOptions = {
	host: true,
	allowedHosts: true,
};

export default defineConfig({
	plugins: [sveltekit()],
	server: opts,
	preview: opts,
});
