import Elysia, { t } from 'elysia';
import auth from './auth';
import task from './task';
import user from './user';

export default new Elysia({ tags: ['Main'] })
	.get('/health', () => ({ status: 'ok' as const }), {
		detail: { summary: 'Health Check' },
		response: t.Object({ status: t.Literal('ok') }),
	})
	.use(auth)
	.use(user)
	.use(task);
