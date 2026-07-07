import { forwardRef } from 'react'

import { cn } from '@shared/utils'

import type { IconButtonProps } from './IconButton.types'
import { iconButtonVariants } from './IconButton.variants'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			'aria-label': ariaLabel,
			className,
			disabled,
			icon,
			size,
			type = 'button',
			variant,
			...props
		},
		ref,
	) => (
		<button
			ref={ref}
			type={type}
			disabled={disabled}
			aria-label={ariaLabel}
			className={cn(iconButtonVariants({ variant, size }), className)}
			{...props}
		>
			{icon}
		</button>
	),
)

IconButton.displayName = 'IconButton'
