import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'dashboard-theme'

function getInitialTheme(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'light'
	}

	const storedTheme = window.localStorage.getItem(STORAGE_KEY)

	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

export function useTheme() {
	const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

	useEffect(() => {
		const root = document.documentElement

		root.classList.toggle('dark', theme === 'dark')
		window.localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	return {
		theme,
		setTheme,
		toggleTheme: () =>
			setTheme((currentTheme) =>
				currentTheme === 'dark' ? 'light' : 'dark',
			),
	}
}
