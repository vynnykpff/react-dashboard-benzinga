import type { TableColumn } from '../Table.types'
import { cn } from '@shared/utils'

import { TableCell } from './TableCell'

type TableRowProps<TData> = {
	columns: TableColumn<TData>[]
	className?: string
	row: TData
}

export const TableRow = <TData,>({
	columns,
	className,
	row,
}: TableRowProps<TData>) => (
	<tr className={cn('transition hover:bg-dashboard-muted/60', className)}>
		{columns.map(column => (
			<TableCell
				key={column.id}
				column={column}
				row={row}
			/>
		))}
	</tr>
)
