import bearer from '@elysiajs/bearer';
import {
	suru_schema_task,
	suru_schema_task_create,
	suru_schema_task_update,
	suru_task_create,
	suru_task_delete,
	suru_task_list,
	suru_task_toggle,
	suru_task_update,
} from '@suru/core';
import Elysia, { t } from 'elysia';
import { validate_jwt } from '../auth';

export default new Elysia({ prefix: '/task', tags: ['Tasks'], detail: { security: [{ bearerAuth: [] }] } })
	.use(bearer())
	.derive(async ({ bearer }) => ({
		user: await validate_jwt(bearer),
	}))
	.get('/list', ({ user }) => suru_task_list(user), {
		detail: { summary: 'Get tasks list' },
		response: t.Array(suru_schema_task),
	})
	.post('/create', ({ user, body }) => suru_task_create(user, body), {
		detail: { summary: 'Create a task' },
		body: suru_schema_task_create,
		response: t.Array(suru_schema_task),
	})
	.put('/item/:id', ({ user, params, body }) => suru_task_update(user, params.id, body), {
		detail: { summary: 'Update a task' },
		params: t.Object({ id: t.String() }),
		body: suru_schema_task_update,
		response: t.Array(suru_schema_task),
	})
	.patch('/item/:id', ({ user, params }) => suru_task_toggle(user, params.id), {
		detail: { summary: 'Toggle a task' },
		params: t.Object({ id: t.String() }),
		response: t.Array(suru_schema_task),
	})
	.delete('/item/:id', ({ user, params }) => suru_task_delete(user, params.id), {
		detail: { summary: 'Delete a task' },
		params: t.Object({ id: t.String() }),
		response: t.Array(suru_schema_task),
	});
