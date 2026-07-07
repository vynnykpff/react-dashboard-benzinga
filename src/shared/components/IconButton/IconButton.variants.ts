import { cva } from 'class-variance-authority'

export const iconButtonVariants = cva(
	[
		'inline-grid shrink-0 cursor-pointer place-items-center rounded-md border shadow-xs transition',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent/25',
		'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	],
	{
		variants: {
			variant: {
				primary:
					'border-dashboard-accent bg-dashboard-accent text-white hover:border-dashboard-accent-strong hover:bg-dashboard-accent-strong',
				secondary:
					'border-dashboard-border bg-dashboard-panel text-dashboard-text hover:border-dashboard-border-strong hover:bg-dashboard-muted',
				ghost:
					'border-transparent bg-transparent text-dashboard-text shadow-none hover:bg-dashboard-muted',
				danger:
					'border-dashboard-negative bg-dashboard-negative text-white hover:border-dashboard-negative hover:bg-dashboard-negative/90',
			},
			size: {
				sm: 'size-8 [&_svg]:size-4',
				md: 'size-10 [&_svg]:size-5',
				lg: 'size-12 [&_svg]:size-5',
			},
		},
		defaultVariants: {
			variant: 'secondary',
			size: 'md',
		},
	},
)
