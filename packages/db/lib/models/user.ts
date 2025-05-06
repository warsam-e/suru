import { CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task';

@Entity()
export class User {
	@PrimaryColumn('int')
	id: number;

	@OneToMany(
		() => Task,
		(task) => task.user,
		{ cascade: true, onDelete: 'CASCADE' },
	)
	tasks: Task[];

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;
}
