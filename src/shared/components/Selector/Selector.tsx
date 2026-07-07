import { Check, ChevronDown, Search, X } from 'lucide-react'
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@shared/components/Button'
import { IconButton } from '@shared/components/IconButton'
import { Input } from '@shared/components/Input'
import { useDebounce } from '@shared/hooks'
import { cn } from '@shared/utils'

import type { SelectorOption, SelectorProps } from './Selector.types'

export const Selector = ({
	options,
	value,
	onValueChange,
	variant = 'default',
	label,
	placeholder = 'Select company',
	searchable = false,
	searchPlaceholder = 'Search companies...',
	emptyMessage = 'No companies found',
	disabled = false,
	clearable = false,
	className,
}: SelectorProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)

	const rootRef = useRef<HTMLDivElement>(null)
	const searchInputRef = useRef<HTMLInputElement>(null)

	const isSimple = variant === 'simple'
	const selectedOption = options.find(option => option.value === value)
	const debouncedQuery = useDebounce(query, 250)
	const filterQuery = query ? debouncedQuery : ''

	const filteredOptions = useMemo(() => {
		if (!searchable) {
			return options
		}

		const normalizedQuery = filterQuery.trim().toLowerCase()

		if (!normalizedQuery) {
			return options
		}

		return options.filter(option =>
			[option.label, option.description, option.supportingText]
				.filter(Boolean)
				.join(' ')
				.toLowerCase()
				.includes(normalizedQuery),
		)
	}, [filterQuery, options, searchable])

	const enabledOptions = filteredOptions.filter(option => !option.disabled)

	useEffect(() => {
		if (!isOpen || !searchable) {
			return
		}

		setTimeout(() => searchInputRef.current?.focus(), 0)
	}, [isOpen, searchable])

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const handlePointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('pointerdown', handlePointerDown)

		return () => document.removeEventListener('pointerdown', handlePointerDown)
	}, [isOpen])

	const selectOption = (option: SelectorOption) => {
		if (option.disabled) {
			return
		}

		onValueChange?.(option.value, option)
		setIsOpen(false)
		setQuery('')
	}

	const getSelectedIndex = () => {
		const selectedIndex = filteredOptions.findIndex(
			option => option.value === value && !option.disabled,
		)

		return selectedIndex >= 0 ? selectedIndex : 0
	}

	const toggleMenu = () => {
		setIsOpen(current => {
			const nextIsOpen = !current

			if (nextIsOpen) {
				setActiveIndex(getSelectedIndex())
			}

			return nextIsOpen
		})
	}

	const clearSelection = () => {
		if (!clearable || !selectedOption) {
			return
		}

		const emptyOption = { value: '', label: '' }
		onValueChange?.('', emptyOption)
		setQuery('')
	}

	const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			setIsOpen(false)
			return
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault()

			if (enabledOptions.length === 0) {
				return
			}

			const direction = event.key === 'ArrowDown' ? 1 : -1
			const currentOption = filteredOptions[activeIndex]
			const currentEnabledIndex = Math.max(
				enabledOptions.findIndex(
					option => option.value === currentOption?.value,
				),
				0,
			)
			const nextEnabledIndex =
				(currentEnabledIndex + direction + enabledOptions.length) %
				enabledOptions.length
			const nextOption = enabledOptions[nextEnabledIndex]
			const nextIndex = filteredOptions.findIndex(
				option => option.value === nextOption.value,
			)

			setActiveIndex(nextIndex)
			return
		}

		if (event.key === 'Enter') {
			event.preventDefault()
			const activeOption = filteredOptions[activeIndex]

			if (activeOption) {
				selectOption(activeOption)
			}
		}
	}

	return (
		<div
			ref={rootRef}
			className={cn('relative w-full max-w-sm', className)}
		>
			{label && (
				<label className="mb-2 block text-sm font-medium text-dashboard-text">
					{label}
				</label>
			)}

			<div className="relative">
				<Button
					variant="secondary"
					size={null}
					disabled={disabled}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					onClick={toggleMenu}
					className={cn(
						'w-full justify-start text-left',
						isSimple ? 'min-h-10 gap-2 px-3 py-2' : 'min-h-12 px-3 py-2',
						isOpen && 'border-dashboard-accent ring-2 ring-dashboard-accent/20',
					)}
				>
					{isSimple ? null : (
						<div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-dashboard-accent-soft text-sm font-semibold text-dashboard-accent">
							{selectedOption?.icon ?? selectedOption?.label.slice(0, 1) ?? 'C'}
						</div>
					)}

					<div className="min-w-0 flex-1">
						<p
							className={cn(
								'truncate font-semibold',
								isSimple ? 'text-sm' : 'text-sm',
								selectedOption
									? 'text-dashboard-text'
									: 'text-dashboard-text-muted',
							)}
						>
							{selectedOption?.label ?? placeholder}
						</p>
						{!isSimple && selectedOption?.description ? (
							<p className="truncate text-xs text-dashboard-text-muted">
								{selectedOption.description}
							</p>
						) : null}
					</div>

					{clearable && selectedOption ? (
						<IconButton
							variant="ghost"
							size="sm"
							aria-label="Clear selected company"
							onClick={event => {
								event.stopPropagation()
								clearSelection()
							}}
							icon={
								<X
									className="size-4"
									aria-hidden="true"
								/>
							}
							className="size-7 text-dashboard-text-muted hover:text-dashboard-text"
						/>
					) : null}

					<ChevronDown
						className={cn(
							'size-4 shrink-0 text-dashboard-text-muted transition',
							isOpen && 'rotate-180 text-dashboard-accent',
						)}
						aria-hidden="true"
					/>
				</Button>

				{isOpen ? (
					<div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-md border border-dashboard-border bg-dashboard-panel shadow-xl shadow-slate-950/10 dark:shadow-black/30">
						{searchable ? (
							<div className="border-b border-dashboard-border bg-dashboard-panel-strong px-3 py-2">
								<Input
									ref={searchInputRef}
									value={query}
									onChange={event => {
										setQuery(event.target.value)
										setActiveIndex(0)
									}}
									onKeyDown={handleSearchKeyDown}
									placeholder={searchPlaceholder}
									inputSize="sm"
									leftIcon={
										<Search
											className="size-4"
											aria-hidden="true"
										/>
									}
									wrapperClassName="border-transparent bg-transparent px-0 shadow-none focus-within:border-transparent focus-within:ring-0"
									className="text-sm"
								/>
							</div>
						) : null}

						<ul
							role="listbox"
							aria-label={label}
							className="max-h-72 overflow-y-auto p-1"
						>
							{filteredOptions.length > 0 ? (
								filteredOptions.map((option, index) => {
									const isSelected = option.value === value
									const isActive = index === activeIndex

									return (
										<li key={option.value}>
											<Button
												variant="ghost"
												size={null}
												role="option"
												aria-selected={isSelected}
												disabled={option.disabled}
												onMouseEnter={() => setActiveIndex(index)}
												onMouseDown={event => event.preventDefault()}
												onClick={() => selectOption(option)}
												className={cn(
													'h-auto w-full text-left shadow-none',
													isSimple
														? 'justify-between gap-2 px-3 py-2'
														: 'justify-start px-3 py-2.5 text-sm',
													isActive && 'bg-dashboard-muted',
													isSelected && 'text-dashboard-accent',
													option.disabled && 'opacity-45 hover:bg-transparent',
												)}
											>
												{isSimple ? null : (
													<div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-dashboard-accent-soft text-xs font-semibold text-dashboard-accent">
														{option.icon ?? option.label.slice(0, 1)}
													</div>
												)}

												<div className="min-w-0 flex-1">
													<p className="truncate font-medium text-dashboard-text">
														{option.label}
													</p>
													<div
														className={cn(
															'min-w-0 items-center gap-2 text-xs text-dashboard-text-muted',
															isSimple ? 'hidden' : 'flex',
														)}
													>
														{option.description ? (
															<span className="truncate">
																{option.description}
															</span>
														) : null}
														{option.supportingText ? (
															<span className="shrink-0">
																{option.supportingText}
															</span>
														) : null}
													</div>
												</div>

												<Check
													className={cn(
														'size-4 shrink-0',
														isSelected ? 'opacity-100' : 'opacity-0',
													)}
													aria-hidden="true"
												/>
											</Button>
										</li>
									)
								})
							) : (
								<li className="px-3 py-6 text-center text-sm text-dashboard-text-muted">
									{emptyMessage}
								</li>
							)}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	)
}
