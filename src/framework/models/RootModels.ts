import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class ModelWithTimesStamps {
	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

export class RootModelWithSoftDelete extends ModelWithTimesStamps {
	@Column()
	deleted_at: Date
}
