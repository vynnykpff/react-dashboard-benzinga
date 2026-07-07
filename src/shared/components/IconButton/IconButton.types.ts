import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { iconButtonVariants } from './IconButton.variants'

export type IconButtonProps = Omit<
	ComponentPropsWithoutRef<'button'>,
	'aria-label' | 'children'
> &
	VariantProps<typeof iconButtonVariants> & {
		'aria-label': string
		icon: ReactNode
	}
