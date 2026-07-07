import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
	[
		'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-semibold shadow-xs transition',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent/25',
		'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
		'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
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
				sm: 'h-9 px-3 text-xs',
				md: 'h-10 px-4',
				lg: 'h-12 px-5 text-base',
			},
			fullWidth: {
				true: 'w-full',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
)
