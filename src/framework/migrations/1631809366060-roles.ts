import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { TableOptions } from 'typeorm/schema-builder/options/TableOptions'

export const rolesTable = (tableName: string): TableOptions => ({
	name: tableName,
	columns: [
		{
			type: 'bigint',
			unsigned: true,
			name: 'id',
			isPrimary: true,
			isGenerated: true,
			generationStrategy: 'increment',
		},
		{
			type: 'varchar',
			name: 'profile',
			length: '100',
			isUnique: true,
			isNullable: false,
		},
		{
			type: 'timestamp',
			name: 'created_at',
			default: 'now()',
		},
		{
			type: 'timestamp',
			name: 'updated_at',
			default: 'now()',
		},
	],
})

export class roles1631828177589 implements MigrationInterface {
	readonly userTableName = 'roles'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(rolesTable(this.userTableName)))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.userTableName)
	}
}
