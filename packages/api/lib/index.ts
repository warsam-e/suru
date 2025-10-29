import { cors } from '@elysiajs/cors';
import { get_env, IS_PROD } from '@suru/utils';
import Elysia, { ValidationError } from 'elysia';

import { SWAGGER_CONF } from './conf';
import routes from './routes';

const API_PORT = IS_PROD ? 3000 : get_env('API_PORT', 'number');

const app = new Elysia()
	.onError(({ error, set }) => {
		console.log({ error });
		if ('status' in error) set.status = error.status;
		else if ('code' in error && 'response' in error) {
			set.status = error.code;
			return { error: error.response };
		} else {
			console.error(error);
			set.status = 500;
		}

		if (error instanceof ValidationError) return { error: JSON.parse(error.message).summary };
		if (error instanceof Error) return { error: error.message };
		return { error };
	})
	.use(cors())
	.use(SWAGGER_CONF)
	.get('/', ({ redirect }) => redirect('/docs'))
	.use(routes)
	.listen(API_PORT, () => console.log(`API is running on port ${API_PORT}`));

export type App = typeof app;
