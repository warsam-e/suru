import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Task {
	@PrimaryColumn('uuid', { generated: 'uuid' })
	id: string;

	@ManyToOne(
		() => User,
		(user) => user.id,
	)
	user: User;

	@Column({ type: 'text' })
	text: string;

	@Column({ type: 'boolean', default: false })
	done: boolean;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;
}
