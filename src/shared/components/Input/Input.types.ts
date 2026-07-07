import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { inputVariants } from './Input.variants'

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> &
	Omit<VariantProps<typeof inputVariants>, 'size'> & {
		leftIcon?: ReactNode
		rightIcon?: ReactNode
		inputSize?: 'sm' | 'md' | 'lg'
		wrapperClassName?: string
	}
