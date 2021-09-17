import { usersTable } from '@framework/migrations/tables/users'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { removeDefaultValues } from '../typeorm/removeDefaultValue'

export class users1631871378754 implements MigrationInterface {
	private usersTableName = 'users'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				...removeDefaultValues(usersTable(this.usersTableName)),
				engine: 'MEMORY',
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable(this.usersTableName)
	}
}
