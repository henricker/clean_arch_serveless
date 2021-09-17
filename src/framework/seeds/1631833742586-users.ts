import 'reflect-metadata'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { RoleModel } from '../models/Role'
import { UserModel } from '../models/User'
import { HasherService } from '../services/hasher/hasherService'

export class users1631833742586 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const adminRole = await queryRunner.manager.findOneOrFail(RoleModel, {
			where: { profile: 'admin' },
		})
		const managerRole = await queryRunner.manager.findOneOrFail(RoleModel, {
			where: { profile: 'manager' },
		})

		const usersData: Partial<UserModel>[] = [
			{
				full_name: 'Admin',
				email: 'admin.clean_arch@luby.software',
				password: await new HasherService().create('admin_password'),
				role_id: adminRole.id,
			},
			{
				full_name: 'Manager',
				email: 'manager.clean_arch@luby.software',
				password: await new HasherService().create('manager_password'),
				role_id: managerRole.id,
			},
		]

		await queryRunner.manager.save(UserModel, usersData)
	}

	public async down(_queryRunner: QueryRunner): Promise<void> {}
}
