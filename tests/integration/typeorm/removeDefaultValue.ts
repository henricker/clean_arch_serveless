import { TableOptions } from 'typeorm/schema-builder/options/TableOptions'

export const removeDefaultValues = (options: TableOptions): TableOptions => {
	const columnsWithoutTableOptions = options.columns.map((column) => {
		delete column.default
		return column
	})

	return { ...options, columns: columnsWithoutTableOptions }
}
