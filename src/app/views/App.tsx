import { useCompanyFinancials } from '@/app/hooks/useCompanyFinancials'
import {
	DashboardHeader,
	DashboardWorkspaceSection,
} from '@/app/views/components'

export function App() {
	const {
		companyOptions,
		isLoading,
		latestRecord,
		records,
		selectedCompany,
		setSelectedCompany,
	} = useCompanyFinancials()

	return (
		<main className="min-h-svh bg-dashboard px-4 py-6 text-dashboard-text sm:px-6 sm:py-8 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
				<DashboardHeader
					companyOptions={companyOptions}
					selectedCompany={selectedCompany}
					onCompanyChange={setSelectedCompany}
				/>
				<DashboardWorkspaceSection
					isLoading={isLoading}
					latestRecord={latestRecord}
					records={records}
					selectedCompany={selectedCompany}
				/>
			</div>
		</main>
	)
}
