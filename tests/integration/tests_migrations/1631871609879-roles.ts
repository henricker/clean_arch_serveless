import { rolesTable } from '@framework/migrations/tables/roles'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { removeDefaultValues } from '../typeorm/removeDefaultValue'

export class roles1631871609879 implements MigrationInterface {
	private rolesTableName = 'roles'
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				...removeDefaultValues(rolesTable(this.rolesTableName)),
				engine: 'MEMORY',
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.rolesTableName)
	}
}
