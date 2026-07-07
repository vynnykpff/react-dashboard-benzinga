import type { ReactNode } from 'react'

import type {
	TableColumn,
	TableSortDirection,
	TableSortState,
	TableSortValue,
} from './Table.types'

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50]

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: 'base',
})

const isNil = (value: TableSortValue): value is null | undefined =>
	value === null || value === undefined

const normalizeSortValue = (value: TableSortValue) => {
	if (value instanceof Date) {
		return value.getTime()
	}

	return value
}

export const getCellValue = <TData,>(
	row: TData,
	column: TableColumn<TData>,
): ReactNode => {
	if (typeof column.accessor === 'function') {
		return column.accessor(row)
	}

	const value: unknown = row[column.accessor]

	if (value === null || value === undefined) {
		return null
	}

	return String(value)
}

export const getSortValue = <TData,>(
	row: TData,
	column: TableColumn<TData>,
): TableSortValue => {
	if (column.sortValue) {
		return column.sortValue(row)
	}

	if (typeof column.accessor === 'function') {
		return String(column.accessor(row))
	}

	const value: unknown = row[column.accessor]

	if (
		value === null ||
		value === undefined ||
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		value instanceof Date
	) {
		return value
	}

	return String(value)
}

export const compareValues = (a: TableSortValue, b: TableSortValue) => {
	const first = normalizeSortValue(a)
	const second = normalizeSortValue(b)

	if (first === second) {
		return 0
	}

	if (isNil(first) || isNil(second)) {
		return isNil(first) ? 1 : -1
	}

	if (typeof first === 'number' && typeof second === 'number') {
		return first - second
	}

	if (typeof first === 'boolean' && typeof second === 'boolean') {
		return Number(first) - Number(second)
	}

	return collator.compare(String(first), String(second))
}

export const getNextDirection = (
	currentSort: TableSortState | undefined,
	columnId: string,
): TableSortDirection => {
	if (currentSort?.columnId !== columnId) {
		return 'asc'
	}

	return currentSort.direction === 'asc' ? 'desc' : 'asc'
}
