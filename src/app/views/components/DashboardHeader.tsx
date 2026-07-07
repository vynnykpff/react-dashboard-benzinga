import { useTheme } from '@/app/hooks'
import type { SelectorOption } from '@shared/components'
import { Chip, Paper, Selector, ThemeSwitcher } from '@shared/components'

type DashboardHeaderProps = {
	companyOptions: SelectorOption[]
	selectedCompany: string
	onCompanyChange: (value: string) => void
}

export const DashboardHeader = ({
	companyOptions,
	selectedCompany,
	onCompanyChange,
}: DashboardHeaderProps) => {
	const { theme, toggleTheme } = useTheme()

	return (
		<Paper
			as="header"
			className="overflow-visible"
		>
			<div className="dashboard-header-surface rounded-[inherit] p-4 sm:p-5">
				<div className="flex flex-col gap-4">
					<Chip
						showDot
						className="mx-auto w-fit md:hidden"
					>
						Benzinga workspace
					</Chip>
					<div className="flex flex-col gap-3 md:relative md:min-h-10 md:flex-row md:items-center md:justify-between">
						<div className="w-full md:max-w-56">
							<Selector
								options={companyOptions}
								value={selectedCompany}
								onValueChange={onCompanyChange}
								variant="simple"
								placeholder="Select company"
								searchable
								className="max-w-full"
							/>
						</div>
						<Chip
							showDot
							className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2"
						>
							Benzinga workspace
						</Chip>
						<div className="flex w-full justify-center md:ml-auto md:w-auto md:justify-end">
							<ThemeSwitcher
								theme={theme}
								onToggle={toggleTheme}
							/>
						</div>
					</div>
				</div>
			</div>
		</Paper>
	)
}
