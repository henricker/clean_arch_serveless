import 'reflect-metadata'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { RoleModel } from '../models/Role'

export class roles1631833154967 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const createRoles = ['admin', 'manager']

		await queryRunner.manager.save(
			RoleModel,
			createRoles.map((role) => ({ profile: role }))
		)
	}

	public async down(_queryRunner: QueryRunner): Promise<void> {}
}
