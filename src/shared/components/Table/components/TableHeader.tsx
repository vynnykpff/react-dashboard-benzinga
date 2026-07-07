import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'

import { Button } from '@shared/components/Button'
import { cn } from '@shared/utils'

import type { TableColumn, TableSortState } from '../Table.types'

type TableHeaderProps<TData> = {
	columns: TableColumn<TData>[]
	onSort: (column: TableColumn<TData>) => void
	sort?: TableSortState
}

export const TableHeader = <TData,>({
	columns,
	onSort,
	sort,
}: TableHeaderProps<TData>) => (
	<thead className="bg-dashboard-panel-strong text-xs font-semibold uppercase text-dashboard-text-muted">
		<tr>
			{columns.map(column => {
				const isSorted = sort?.columnId === column.id
				const SortIcon = sort?.direction === 'asc' ? ArrowUp : ArrowDown

				return (
					<th
						key={column.id}
						scope="col"
						aria-sort={
							isSorted
								? sort.direction === 'asc'
									? 'ascending'
									: 'descending'
								: undefined
						}
						className={cn(
							'border-b border-dashboard-border px-4 py-3 text-left',
							column.align === 'center' && 'text-center',
							column.align === 'right' && 'text-right',
							column.headerClassName,
						)}
					>
						{column.sortable ? (
							<Button
								variant="ghost"
								size={null}
								onClick={() => onSort(column)}
								className={cn(
									'h-auto px-0 py-0 text-xs font-semibold uppercase shadow-none hover:text-dashboard-text',
									column.align === 'right' && 'justify-end',
									column.align === 'center' && 'justify-center',
									isSorted && 'text-dashboard-accent',
								)}
							>
								<span>{column.header}</span>
								{isSorted ? (
									<SortIcon
										className="size-3.5"
										aria-hidden="true"
									/>
								) : (
									<ChevronsUpDown
										className="size-3.5 opacity-50"
										aria-hidden="true"
									/>
								)}
							</Button>
						) : (
							column.header
						)}
					</th>
				)
			})}
		</tr>
	</thead>
)
