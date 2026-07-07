import { LoaderCircle } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@shared/utils'

import type { ButtonProps } from './Button.types'
import { buttonVariants } from './Button.variants'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled,
			fullWidth,
			isLoading = false,
			leftIcon,
			rightIcon,
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
			disabled={disabled || isLoading}
			aria-busy={isLoading || undefined}
			className={cn(buttonVariants({ variant, size, fullWidth }), className)}
			{...props}
		>
			{isLoading ? (
				<LoaderCircle
					className="animate-spin"
					aria-hidden="true"
				/>
			) : (
				leftIcon
			)}
			{children}
			{rightIcon}
		</button>
	),
)

Button.displayName = 'Button'
