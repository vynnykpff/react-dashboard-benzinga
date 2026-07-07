import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

import { IconButton } from '@shared/components/IconButton'
import { Selector } from '@shared/components/Selector'
import { cn } from '@shared/utils'
import type { PaginationProps } from './Pagination.types'

export const Pagination = ({
	currentPage,
	onPageChange,
	onPageSizeChange,
	pageCount,
	pageSize,
	pageSizeOptions,
	rowCountLabel,
	className,
}: PaginationProps) => {
	const pageSizeSelectorOptions = useMemo(
		() =>
			pageSizeOptions.map(option => ({
				value: String(option),
				label: `${option} rows`,
			})),
		[pageSizeOptions],
	)

	const handlePageSizeChange = (value: string) => {
		const nextPageSize = Number(value)

		if (!Number.isFinite(nextPageSize)) {
			return
		}

		onPageSizeChange(nextPageSize)
	}

	return (
		<div
			className={cn(
				'flex flex-col gap-3 border-t border-dashboard-border bg-dashboard-panel-strong px-4 py-3 sm:flex-row sm:items-end sm:justify-between',
				className,
			)}
		>
			<div className="text-sm text-dashboard-text-muted">{rowCountLabel}</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
				<Selector
					variant="simple"
					options={pageSizeSelectorOptions}
					value={String(pageSize)}
					onValueChange={handlePageSizeChange}
					className="max-w-36"
				/>

				<div className="flex items-center gap-2">
					<IconButton
						variant="secondary"
						size="md"
						disabled={currentPage <= 1}
						onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
						aria-label="Previous page"
						icon={
							<ChevronLeft
								className="size-4"
								aria-hidden="true"
							/>
						}
						className="text-dashboard-text-muted hover:text-dashboard-text"
					/>

					<span className="min-w-24 text-center text-sm font-medium text-dashboard-text">
						Page {currentPage} of {pageCount}
					</span>

					<IconButton
						variant="secondary"
						size="md"
						disabled={currentPage >= pageCount}
						onClick={() => onPageChange(Math.min(currentPage + 1, pageCount))}
						aria-label="Next page"
						icon={
							<ChevronRight
								className="size-4"
								aria-hidden="true"
							/>
						}
						className="text-dashboard-text-muted hover:text-dashboard-text"
					/>
				</div>
			</div>
		</div>
	)
}
