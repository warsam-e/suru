import bearer from '@elysiajs/bearer';
import { suru_schema_user } from '@suru/core';
import Elysia, { t } from 'elysia';
import { validate_jwt } from '../auth';

export default new Elysia({
	prefix: '/user',
	tags: ['User'],
	detail: { security: [{ bearerAuth: [] }] },
})
	.use(bearer())
	.derive(async ({ bearer }) => ({
		user: await validate_jwt(bearer),
	}))
	.get('/info', ({ user }) => user, {
		detail: { summary: 'Get user info' },
		response: {
			200: suru_schema_user,
			401: t.Object({ error: t.String() }),
		},
	});
