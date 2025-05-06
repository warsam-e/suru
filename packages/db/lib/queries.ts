import type { DeepPartial } from 'typeorm';
import { _dbAll, _dbCreate, _dbRemove } from './db';
import { Task, User } from './models';

export const db_user_get = async (id: number) => _dbAll(User, { id }).then((r) => r.at(0));
export const db_user_create = async (user: DeepPartial<User>) => _dbCreate(User, user);

export const db_task_list = async (user_id: number) => _dbAll(Task, { user: { id: user_id } });
export const db_task_create = async (task: DeepPartial<Task>) => _dbCreate(Task, task);
export const db_task_update = async (user_id: number, id: string, task: DeepPartial<Task>) =>
	_dbCreate(Task, { ...task, id, user: { id: user_id } });
export const db_task_remove = async (user_id: number, id: string) => _dbRemove(Task, { id, user: { id: user_id } });
