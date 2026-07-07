import { MoonStar, SunMedium } from 'lucide-react'

import { Button } from '../Button'

export type ThemeSwitcherTheme = 'light' | 'dark'

type ThemeSwitcherProps = {
	onToggle: () => void
	theme: ThemeSwitcherTheme
}

export const ThemeSwitcher = ({ onToggle, theme }: ThemeSwitcherProps) => {
	const isDarkTheme = theme === 'dark'

	return (
		<Button
			type="button"
			variant="secondary"
			size="sm"
			onClick={onToggle}
			leftIcon={
				isDarkTheme ? (
					<SunMedium
						className="size-4"
						aria-hidden="true"
					/>
				) : (
					<MoonStar
						className="size-4"
						aria-hidden="true"
					/>
				)
			}
			aria-pressed={isDarkTheme}
			className="min-w-36 justify-center"
		>
			{isDarkTheme ? 'Switch to light' : 'Switch to dark'}
		</Button>
	)
}
