import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { usersTable } from './tables/users'

export class users1631809366061 implements MigrationInterface {
	readonly userTableName = 'users'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(usersTable(this.userTableName)))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.userTableName)
	}
}
