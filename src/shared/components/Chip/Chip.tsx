import { cn } from '@shared/utils'

import type { ChipProps } from './Chip.types'

export const Chip = ({
	children,
	className,
	dotClassName,
	showDot = false,
	...props
}: ChipProps) => (
	<div
		className={cn(
			'inline-flex items-center gap-2 rounded-full border border-dashboard-border bg-dashboard-panel/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-dashboard-text-muted backdrop-blur',
			className,
		)}
		{...props}
	>
		{showDot ? (
			<span
				aria-hidden="true"
				className={cn('size-2 rounded-full bg-dashboard-positive', dotClassName)}
			/>
		) : null}
		{children}
	</div>
)
