import type { ReactNode } from 'react'

export type TableSortDirection = 'asc' | 'desc'

export type TableSortValue = string | number | boolean | Date | null | undefined

export type TableColumn<TData> = {
	id: string
	header: ReactNode
	accessor: keyof TData | ((row: TData) => ReactNode)
	sortable?: boolean
	sortValue?: (row: TData) => TableSortValue
	align?: 'left' | 'center' | 'right'
	className?: string
	headerClassName?: string
}

export type TableSortState = {
	columnId: string
	direction: TableSortDirection
}

export type TableProps<TData> = {
	columns: TableColumn<TData>[]
	data: TData[]
	getRowKey: (row: TData, index: number) => string | number
	defaultSort?: TableSortState
	defaultPageSize?: number
	pageSizeOptions?: number[]
	emptyMessage?: string
	isLoading?: boolean
	loadingMessage?: string
	className?: string
}
