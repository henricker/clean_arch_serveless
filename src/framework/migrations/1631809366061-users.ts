import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { TableOptions } from 'typeorm/schema-builder/options/TableOptions'

export const usersTable = (tableName: string): TableOptions => ({
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
			type: 'bigint',
			unsigned: true,
			name: 'role_id',
			isNullable: false,
		},
		{
			type: 'varchar',
			name: 'uuid',
			length: '36',
			isNullable: false,
			default: '(uuid())',
			isUnique: true,
		},
		{
			type: 'varchar',
			length: '60',
			name: 'full_name',
			isNullable: false,
		},
		{
			type: 'varchar',
			length: '100',
			name: 'email',
			isNullable: false,
		},
		{
			type: 'varchar',
			length: '255',
			name: 'password',
			isNullable: false,
		},
		{
			type: 'timestamp',
			name: 'deleted_at',
			isNullable: true,
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
	foreignKeys: [
		{
			columnNames: ['role_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	],
})

export class users1631809366061 implements MigrationInterface {
	readonly userTableName = 'users'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(usersTable(this.userTableName)))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.userTableName)
	}
}
