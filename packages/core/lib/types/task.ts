import { t } from 'elysia';

export const suru_schema_task_create = t.Object({
	text: t.String(),
	done: t.Optional(t.Boolean()),
});
export type SuruTaskCreate = typeof suru_schema_task_create.static;

export const suru_schema_task_update = t.Object({
	text: t.String(),
	done: t.Boolean(),
});
export type SuruTaskUpdate = typeof suru_schema_task_update.static;

export const suru_schema_task = t.Object({
	id: t.String(),
	text: t.String(),
	done: t.Boolean(),
	created_at: t.String({ format: 'date-time' }),
	updated_at: t.String({ format: 'date-time' }),
});
export type SuruTask = typeof suru_schema_task.static;
