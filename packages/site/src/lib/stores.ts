import type { SuruTask, SuruUser } from '@suru/core';
import { persisted } from 'svelte-persisted-store';
import { type Readable, derived, get, writable } from 'svelte/store';

export const token = persisted<string | null>('suru_token', null, {
	syncTabs: true,
	storage: 'local',
});

export const user = writable<SuruUser | null>(null);
export const loggedIn = derived(user, ($user) => !!$user);

export const store_val = <T>(store: Readable<T>) => get<T>(store);

export const tasks = writable<SuruTask[]>([]);
export const show_completed = persisted<boolean>('show_completed', false, {
	syncTabs: true,
	storage: 'local',
});

export const has_new_tasks = writable(false);

export const overlay_count = writable(0);
