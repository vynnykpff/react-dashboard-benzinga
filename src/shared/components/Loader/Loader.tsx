import { LoaderCircle } from 'lucide-react'

import { cn } from '@shared/utils'

type LoaderProps = {
	label?: string
	className?: string
}

export const Loader = ({
	label = 'Loading...',
	className,
}: LoaderProps) => (
	<div
		className={cn(
			'flex items-center justify-center gap-2 text-sm font-medium text-dashboard-text-muted',
			className,
		)}
		role="status"
		aria-live="polite"
	>
		<LoaderCircle
			className="size-4 animate-spin text-dashboard-accent"
			aria-hidden="true"
		/>
		<span>{label}</span>
	</div>
)
