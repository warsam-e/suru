import type { SuruTask } from '@suru/core';
import { suru_tasks_delete, suru_tasks_list, suru_tasks_toggle, suru_tasks_update, suru_user } from './api';
import { has_new_tasks, store_val, tasks, user } from './stores';

export async function suru_init_account(token: string | null) {
	if (token === null) {
		user.set(null);
		return;
	}
	const data = await suru_user();
	user.set(data);
	await suru_init_tasks();
}

export async function suru_init_tasks(_data?: Array<SuruTask>) {
	if (!store_val(user)) return;
	const data = _data ?? (await suru_tasks_list());
	tasks.set(data);
	has_new_tasks.set(false);
}

// tasks
const _get_task_index = (id: string) => store_val(tasks).findIndex((task) => task.id === id);

export async function _tasks_toggle(id: string, done: boolean) {
	const index = _get_task_index(id);
	if (index === -1) return;
	const task = store_val(tasks)[index];
	task.done = done;
	tasks.update((t) => t.map((_, i) => (i === index ? task : _)));
	console.log({ id, task, tasks });
	if (!id.startsWith('new-')) {
		const data = await suru_tasks_toggle(id);
		await suru_init_tasks(data);
	}
}

export async function _tasks_update(id: string, text: string, done: boolean) {
	const index = _get_task_index(id);
	if (index === -1) return;
	const task = store_val(tasks)[index];
	task.text = text;
	task.done = done;
	tasks.update((t) => t.map((_, i) => (i === index ? task : _)));
	const data = await suru_tasks_update(id, { text, done });
	await suru_init_tasks(data);
}

export async function _tasks_delete(id: string) {
	const index = _get_task_index(id);
	if (index === -1) return;
	tasks.update((t) => t.filter((_, i) => i !== index));
	let data: Array<SuruTask> | undefined;
	if (!id.startsWith('new-')) {
		data = await suru_tasks_delete(id);
	}
	await suru_init_tasks(data);
}
