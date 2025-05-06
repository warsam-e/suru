import { db_task_create, db_task_list, db_task_remove, db_task_update } from '@suru/db';
import { error } from 'elysia';
import type { SuruTask, SuruTaskCreate, SuruTaskUpdate, SuruUser } from '../types';

export async function suru_task_list(user: SuruUser): Promise<SuruTask[]> {
	const res = await db_task_list(user.id);
	if (!res) return [];
	return res
		.toSorted((a, b) => +a.created_at - +b.created_at)
		.map((t) => ({
			id: t.id,
			text: t.text,
			done: t.done,
			created_at: t.created_at.toISOString(),
			updated_at: t.updated_at.toISOString(),
		}));
}

export async function suru_task_create(user: SuruUser, body: SuruTaskCreate): Promise<SuruTask[]> {
	if (!body.text.length) throw error(400, 'Text is required');
	await db_task_create({ ...body, user: { id: user.id } });
	return suru_task_list(user);
}
export async function suru_task_update(user: SuruUser, id: string, body: SuruTaskUpdate): Promise<SuruTask[]> {
	if (!body.text.length) throw error(400, 'Text is required');
	await db_task_update(user.id, id, body);
	return suru_task_list(user);
}

export async function suru_task_toggle(user: SuruUser, id: string): Promise<SuruTask[]> {
	const task = await db_task_list(user.id).then((r) => r.find((t) => t.id === id));
	if (!task) throw error(404, 'Task not found');
	await db_task_update(user.id, id, { done: !task.done });
	return suru_task_list(user);
}

export async function suru_task_delete(user: SuruUser, id: string): Promise<SuruTask[]> {
	await db_task_remove(user.id, id);
	return suru_task_list(user);
}
