import { join } from 'node:path';
import { config } from 'dotenv';

export const IS_PROD = get_env('NODE_ENV', 'string') === 'production';

/** the root folder of the workspace. */
export const proj_root = join(import.meta.url.replace('file://', ''), '../../../..');

if (!IS_PROD) {
	config({
		path: join(proj_root, '.env.local'),
	});
}

type MetaEnv = 'NODE_ENV';
type APIEnv = 'API_PORT' | 'API_HOST' | 'JWT_SECRET' | 'COOKIE_SECRET' | 'COOKIE_DOMAIN';
type GithubEnv = 'GITHUB_CLIENT_ID' | 'GITHUB_CLIENT_SECRET' | 'GITHUB_REDIRECT_URI';
export type Env = MetaEnv | APIEnv | GithubEnv;

export function get_env<
	T extends 'string' | 'boolean' | 'number' = 'string',
	V = T extends 'string' ? string : T extends 'boolean' ? boolean : number,
>(env: Env, type?: T): V {
	const current_type = type ?? ('string' as T);
	const val = Bun.env[env];
	if (!val) {
		if (env !== 'NODE_ENV') throw new Error(`Environment variable ${env} is not set`);
		return 'development' as V;
	}
	if (current_type === 'string') return val as V;
	if (current_type === 'boolean') return (val === 'true') as V;
	const num = Number(val);
	if (Number.isNaN(num)) throw new Error(`Environment variable ${env} is not a number`);
	return num as V;
}
