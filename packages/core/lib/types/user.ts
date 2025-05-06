import { t } from 'elysia';

export const suru_schema_user = t.Object({
	id: t.Number(),
	name: t.Nullable(t.String()),
	username: t.String(),
	avatar: t.String(),
	created_at: t.String({ format: 'date-time' }),
	updated_at: t.String({ format: 'date-time' }),
});
export type SuruUser = typeof suru_schema_user.static;
