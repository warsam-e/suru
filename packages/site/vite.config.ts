import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ServerOptions } from 'vite';

const opts: ServerOptions = {
	host: true,
	allowedHosts: true,
};

export default defineConfig({
	plugins: [sveltekit()],
	server: opts,
	preview: opts,
});
