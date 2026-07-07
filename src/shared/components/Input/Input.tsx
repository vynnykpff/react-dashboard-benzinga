import { forwardRef } from 'react'

import { cn } from '@shared/utils'

import type { InputProps } from './Input.types'
import { inputVariants } from './Input.variants'

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			inputSize,
			leftIcon,
			rightIcon,
			type = 'text',
			wrapperClassName,
			...props
		},
		ref,
	) => (
		<div className={cn(inputVariants({ size: inputSize }), wrapperClassName)}>
			{leftIcon ? (
				<span
					className="shrink-0 text-dashboard-text-muted"
					aria-hidden="true"
				>
					{leftIcon}
				</span>
			) : null}

			<input
				ref={ref}
				type={type}
				className={cn(
					'min-w-0 flex-1 bg-transparent text-dashboard-text outline-none placeholder:text-dashboard-text-muted disabled:cursor-not-allowed',
					className,
				)}
				{...props}
			/>

			{rightIcon ? (
				<span
					className="shrink-0 text-dashboard-text-muted"
					aria-hidden="true"
				>
					{rightIcon}
				</span>
			) : null}
		</div>
	),
)

Input.displayName = 'Input'
