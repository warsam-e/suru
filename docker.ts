import { $ } from 'bun';
import { config } from 'dotenv';

const SERVICE_NAME = process.argv[2];
if (!['dev', 'prod'].includes(SERVICE_NAME)) {
	console.error('Invalid service name. Use "dev" or "prod".');
	process.exit(1);
}

const ENV_FILE = SERVICE_NAME === 'dev' ? '.env.local' : '.env';
console.log(ENV_FILE);

const res = config({ path: ENV_FILE }).parsed;
if (!res) throw new Error(`Failed to load environment variables from ${ENV_FILE}`);

console.log(`Starting ${SERVICE_NAME} service... with environment file: ${ENV_FILE}`);
await $`docker compose --env-file ${ENV_FILE} -f compose.yml up --build -d ${SERVICE_NAME}`.env({
	...(process.env as Record<string, string>),
	...res,
});
