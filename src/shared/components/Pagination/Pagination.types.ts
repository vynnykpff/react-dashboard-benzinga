export type PaginationProps = {
	currentPage: number
	onPageChange: (page: number) => void
	onPageSizeChange: (pageSize: number) => void
	pageCount: number
	pageSize: number
	pageSizeOptions: number[]
	rowCountLabel: string
	className?: string
}
