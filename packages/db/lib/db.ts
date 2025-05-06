import { IS_PROD } from '@suru/utils';
import {
	DataSource,
	type DeepPartial,
	type EntityTarget,
	type FindManyOptions,
	type FindOptionsWhere,
	type ObjectLiteral,
} from 'typeorm';
import { Task, User } from './models';

const host = IS_PROD ? 'suru_db' : 'localhost';
const port = IS_PROD ? 5432 : 9232;

const AppDataSource = new DataSource({
	type: 'postgres',
	host,
	port,
	username: 'suru',
	password: 'suru',
	database: 'suru',
	entities: [Task, User],
	synchronize: true,
	logging: ['error', 'info', 'warn'],
});

console.time('[Suru DB] Initialize');
await AppDataSource.initialize();
console.timeEnd('[Suru DB] Initialize');

const getSource = <T extends ObjectLiteral>(target: EntityTarget<T>) => AppDataSource.getRepository<T>(target);

export const _dbGet = <T extends ObjectLiteral>(target: EntityTarget<T>, by: FindManyOptions<T>) =>
	getSource(target)
		.find(by)
		.then((i) => i.at(0));
export const _dbAll = <T extends ObjectLiteral>(target: EntityTarget<T>, by?: FindOptionsWhere<T>) =>
	by ? getSource(target).findBy(by) : getSource(target).find();

export async function _dbCreate<T extends ObjectLiteral>(target: EntityTarget<T>, entityLike: DeepPartial<T>) {
	const source = getSource(target);
	const item = source.create(entityLike);
	return await source.save(item);
}

export async function _dbUpdate<T extends ObjectLiteral, Data extends T>(
	target: EntityTarget<T>,
	by: FindOptionsWhere<T>,
	entityLike: DeepPartial<Data>,
) {
	const source = getSource(target);
	const item = await source.findOneBy(by);
	if (!item) throw new Error('Item not found');
	source.merge(item, entityLike);
	return await source.save(item);
}

export async function _dbRemove<T extends ObjectLiteral>(target: EntityTarget<T>, by: FindOptionsWhere<T>) {
	const source = getSource(target);
	const item = await source.findOneBy(by);
	if (item) await source.remove(item);
}

export * from 'typeorm';
export * from './queries';

