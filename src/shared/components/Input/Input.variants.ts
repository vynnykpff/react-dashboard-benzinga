import { cva } from 'class-variance-authority'

export const inputVariants = cva(
	[
		'flex w-full items-center gap-2 rounded-md border border-dashboard-border bg-dashboard-panel px-3 text-sm text-dashboard-text shadow-xs transition',
		'focus-within:border-dashboard-accent focus-within:ring-2 focus-within:ring-dashboard-accent/20',
		'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
	],
	{
		variants: {
			size: {
				sm: 'min-h-9',
				md: 'min-h-10',
				lg: 'min-h-12',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)
