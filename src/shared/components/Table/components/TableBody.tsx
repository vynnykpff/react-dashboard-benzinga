import type { TableColumn } from '../Table.types'

import { TableEmptyRow } from './TableEmptyRow'
import { TableRow } from './TableRow'
import { Loader } from '@shared/components/Loader'

type TableBodyProps<TData> = {
	columns: TableColumn<TData>[]
	data: TData[]
	emptyMessage: string
	getRowKey: (row: TData, index: number) => string | number
	isLoading: boolean
	loadingMessage: string
	startIndex: number
}

export const TableBody = <TData,>({
	columns,
	data,
	emptyMessage,
	getRowKey,
	isLoading,
	loadingMessage,
	startIndex,
}: TableBodyProps<TData>) => (
	<tbody className="divide-y divide-dashboard-border">
		{isLoading ? (
			<tr>
				<td
					colSpan={columns.length}
					className="px-4 py-10"
				>
					<Loader label={loadingMessage} />
				</td>
			</tr>
		) : data.length > 0 ? (
			data.map((row, index) => (
				<TableRow
					key={getRowKey(row, startIndex + index)}
					columns={columns}
					row={row}
				/>
			))
		) : (
			<TableEmptyRow
				colSpan={columns.length}
				message={emptyMessage}
			/>
		)}
	</tbody>
)
