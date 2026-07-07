import type { ReactNode } from 'react'

export type SelectorOption = {
	value: string
	label: string
	description?: string
	supportingText?: string
	icon?: ReactNode
	disabled?: boolean
}

export type SelectorProps = {
	options: SelectorOption[]
	value?: string
	onValueChange?: (value: string, option: SelectorOption) => void
	variant?: 'default' | 'simple'
	label?: string
	placeholder?: string
	searchable?: boolean
	searchPlaceholder?: string
	emptyMessage?: string
	disabled?: boolean
	clearable?: boolean
	className?: string
}
