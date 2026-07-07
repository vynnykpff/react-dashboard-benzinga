import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type PaperProps<TElement extends ElementType = 'div'> = {
	as?: TElement
	children: ReactNode
	className?: string
} & Omit<ComponentPropsWithoutRef<TElement>, 'as' | 'children' | 'className'>
