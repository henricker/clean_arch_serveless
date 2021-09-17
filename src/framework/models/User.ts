import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { RoleModel } from './Role'
import { RootModelWithSoftDelete } from './RootModels'

@Entity({ name: 'users' })
export class UserModel extends RootModelWithSoftDelete {
	@PrimaryColumn({ select: false, generated: true })
	id: number

	@Column()
	uuid: string

	@Column()
	role_id: number

	@Column()
	full_name: string

	@Column()
	email: string

	@Column()
	password: string

	@OneToOne(() => RoleModel)
	@JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
	role: RoleModel
}
