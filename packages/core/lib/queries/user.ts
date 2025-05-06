import { db_user_create, db_user_get } from '@suru/db';
import { github_user_by_token } from '../github';
import type { SuruUser } from '../types';

export async function suru_user(token: string): Promise<SuruUser | null> {
	const res = await github_user_by_token(token);
	if (!res) return null;

	const user = (await db_user_get(res.id)) ?? (await db_user_create({ id: res.id }));

	return {
		id: res.id,
		name: res.name,
		username: res.login,
		avatar: res.avatar_url,
		created_at: user.created_at.toISOString(),
		updated_at: user.updated_at.toISOString(),
	};
}
