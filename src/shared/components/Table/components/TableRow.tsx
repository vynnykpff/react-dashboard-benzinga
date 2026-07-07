import type { TableColumn } from '../Table.types'

import { TableCell } from './TableCell'

type TableRowProps<TData> = {
	columns: TableColumn<TData>[]
	row: TData
}

export const TableRow = <TData,>({ columns, row }: TableRowProps<TData>) => (
	<tr className="transition hover:bg-dashboard-muted/60">
		{columns.map(column => (
			<TableCell
				key={column.id}
				column={column}
				row={row}
			/>
		))}
	</tr>
)
