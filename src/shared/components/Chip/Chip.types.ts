import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ChipProps = ComponentPropsWithoutRef<'div'> & {
	children: ReactNode
	dotClassName?: string
	showDot?: boolean
}
