/**
 * wrap a promise in a try/catch block, returning undefined on error and logging (if enabled)
 */
export async function try_prom<T>(prom: Promise<T> | T | undefined, logging = true): Promise<T | undefined> {
	if (!prom) return;
	try {
		return await prom;
	} catch (e) {
		if (logging) console.error(e);
		return undefined;
	}
}

export { join } from 'node:path';
export * from './env.js';

