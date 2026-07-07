import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { buttonVariants } from './Button.variants'

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
	VariantProps<typeof buttonVariants> & {
		isLoading?: boolean
		leftIcon?: ReactNode
		rightIcon?: ReactNode
	}
