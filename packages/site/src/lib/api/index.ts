import { dev } from '$app/environment';
import { route_link } from '$lib/routing';
import { store_val, token, user } from '$lib/stores';
import { type Treaty, treaty } from '@elysiajs/eden';
import type { App } from '@suru/api';
import type { SuruTaskCreate, SuruTaskUpdate } from '@suru/core';

const API_URL = `https://suru${dev ? '-test' : ''}.wars.studio`;

const api = treaty<App>(API_URL, {
	headers: () => {
		const val = store_val(token);
		if (!val) return;
		return { Authorization: `Bearer ${val}` };
	},
});

export class SuruError extends Error {
	code: number;
	constructor(code: number, message: string) {
		super(message);
		this.code = code;
		this.name = 'SuruError';
	}
}

function parse_res<T extends Record<number, unknown>>(res: Treaty.TreatyResponse<T>): NonNullable<T[200]> {
	if (res.status !== 200 || !res.data) throw new SuruError(res.status, String(res.error?.value) ?? 'Unknown error');
	return res.data;
}

export function suru_auth() {
	const uri = new URL(route_link('/auth'), globalThis.location.href);
	const search = new URLSearchParams({ redirect_to: uri.toString() });
	return `${API_URL}/auth/login?${search}`;
}

export async function suru_logout() {
	user.set(null);
	token.set(null);
}

// user
export const suru_user = () => api.user.info.get().then((r) => parse_res(r));

// tasks
export const suru_tasks_list = () => api.task.list.get().then((r) => parse_res(r));
export const suru_tasks_create = (data: SuruTaskCreate) => api.task.create.post(data).then((r) => parse_res(r));
export const suru_tasks_update = (id: string, data: SuruTaskUpdate) =>
	api.task
		.item({ id })
		.put(data)
		.then((r) => parse_res(r));
export const suru_tasks_toggle = (id: string) =>
	api.task
		.item({ id })
		.patch()
		.then((r) => parse_res(r));
export const suru_tasks_delete = (id: string) =>
	api.task
		.item({ id })
		.delete()
		.then((r) => parse_res(r));
