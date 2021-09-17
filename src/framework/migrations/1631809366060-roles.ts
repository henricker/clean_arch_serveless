import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { rolesTable } from './tables/roles'

export class roles1631828177589 implements MigrationInterface {
	readonly userTableName = 'roles'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(rolesTable(this.userTableName)))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.userTableName)
	}
}
