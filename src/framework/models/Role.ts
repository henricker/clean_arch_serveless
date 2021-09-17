import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ModelWithTimesStamps } from './RootModels'

@Entity({ name: 'roles' })
export class RoleModel extends ModelWithTimesStamps {
	@PrimaryColumn({ select: false, generated: true })
	id: number

	@Column()
	profile: string
}
