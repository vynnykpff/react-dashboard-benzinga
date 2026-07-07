import { useMemo, useState } from 'react'

import { Pagination } from '@shared/components/Pagination'
import { cn } from '@shared/utils'

import { TableBody, TableHeader } from './components'
import type { TableColumn, TableProps, TableSortState } from './Table.types'
import {
	compareValuesByDirection,
	DEFAULT_PAGE_SIZE_OPTIONS,
	getNextDirection,
	getSortValue,
} from './Table.utils'

export const Table = <TData,>({
	columns,
	data,
	getRowKey,
	defaultSort,
	defaultPageSize = 10,
	pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
	emptyMessage = 'No records found',
	isLoading = false,
	loadingMessage = 'Loading records...',
	className,
}: TableProps<TData>) => {
	const [sort, setSort] = useState<TableSortState | undefined>(defaultSort)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(defaultPageSize)

	const sortedData = useMemo(() => {
		if (!sort) {
			return data
		}

		const column = columns.find(item => item.id === sort.columnId)

		if (!column) {
			return data
		}

		return [...data].sort((firstRow, secondRow) => {
			return compareValuesByDirection(
				getSortValue(firstRow, column),
				getSortValue(secondRow, column),
				sort.direction,
			)
		})
	}, [columns, data, sort])

	const pageCount = Math.max(Math.ceil(sortedData.length / pageSize), 1)
	const currentPage = Math.min(page, pageCount)
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = Math.min(startIndex + pageSize, sortedData.length)

	const visibleData = useMemo(
		() => sortedData.slice(startIndex, endIndex),
		[endIndex, sortedData, startIndex],
	)

	const rowCountLabel =
		sortedData.length > 0
			? `Showing ${startIndex + 1}-${endIndex} of ${sortedData.length}`
			: 'Showing 0 of 0'

	const handleSort = (column: TableColumn<TData>) => {
		if (!column.sortable) {
			return
		}

		setSort(currentSort => ({
			columnId: column.id,
			direction: getNextDirection(currentSort, column.id),
		}))
		setPage(1)
	}

	const handlePageSizeChange = (nextPageSize: number) => {
		setPageSize(nextPageSize)
		setPage(1)
	}

	return (
		<div
			className={cn(
				'w-full overflow-visible rounded-md border border-dashboard-border bg-dashboard-panel shadow-sm',
				className,
			)}
		>
			<div className="overflow-x-auto">
				<table
					aria-busy={isLoading || undefined}
					className="w-full min-w-180 border-collapse text-sm"
				>
					<TableHeader
						columns={columns}
						onSort={handleSort}
						sort={sort}
					/>

					<TableBody
						columns={columns}
						data={visibleData}
						emptyMessage={emptyMessage}
						getRowKey={getRowKey}
						isLoading={isLoading}
						loadingMessage={loadingMessage}
						startIndex={startIndex}
					/>
				</table>
			</div>

			<Pagination
				currentPage={currentPage}
				onPageChange={setPage}
				onPageSizeChange={handlePageSizeChange}
				pageCount={pageCount}
				pageSize={pageSize}
				pageSizeOptions={pageSizeOptions}
				rowCountLabel={rowCountLabel}
			/>
		</div>
	)
}
