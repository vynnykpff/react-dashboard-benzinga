import { cn } from '@shared/utils'

import type { TableColumn } from '../Table.types'
import { getCellValue } from '../Table.utils'

type TableCellProps<TData> = {
	column: TableColumn<TData>
	row: TData
}

export const TableCell = <TData,>({ column, row }: TableCellProps<TData>) => (
	<td
		className={cn(
			'px-4 py-3 text-dashboard-text',
			column.align === 'center' && 'text-center',
			column.align === 'right' && 'text-right tabular-nums',
			column.className,
		)}
	>
		{getCellValue(row, column)}
	</td>
)
