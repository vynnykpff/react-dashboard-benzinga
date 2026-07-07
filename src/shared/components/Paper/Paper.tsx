import type { ElementType } from 'react'

import { cn } from '@shared/utils'

import type { PaperProps } from './Paper.types'

export const Paper = <TElement extends ElementType = 'div'>({
	as,
	children,
	className,
	...props
}: PaperProps<TElement>) => {
	const Component = as ?? 'div'

	return (
		<Component
			className={cn(
				'overflow-hidden rounded-3xl border border-dashboard-border bg-dashboard-panel shadow-sm',
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
