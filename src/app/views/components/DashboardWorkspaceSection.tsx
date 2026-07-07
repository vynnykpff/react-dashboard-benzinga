import { Loader } from '@shared/components'

import type { FinancialRecord } from '@/app/hooks/useCompanyFinancials'

import { BalanceSheetTrendChart } from './BalanceSheetTrendChart'
import { CompanyFilingsTable } from './CompanyFilingsTable'
import { SummaryCard } from './SummaryCard'

type DashboardWorkspaceSectionProps = {
	isLoading: boolean
	latestRecord: FinancialRecord | null
	records: FinancialRecord[]
	selectedCompany: string
}

export const DashboardWorkspaceSection = ({
	isLoading,
	latestRecord,
	records,
	selectedCompany,
}: DashboardWorkspaceSectionProps) => {
	return (
		<section className="rounded-[28px] border border-dashboard-border bg-dashboard-panel px-5 py-6 shadow-sm sm:px-8 sm:py-8">
			<p className="text-sm font-semibold uppercase tracking-[0.2em] text-dashboard-text-muted">
				Dashboard canvas
			</p>
			<h2 className="mt-2 text-2xl font-semibold tracking-tight">
				{selectedCompany || 'Company'} workspace
			</h2>
			<div className="mt-4 rounded-2xl border border-dashboard-border bg-dashboard-panel-strong px-4 py-5 sm:px-5 sm:py-6">
				{isLoading ? (
					<Loader
						label={`Loading ${selectedCompany || 'company'} financials...`}
						className="justify-start"
					/>
				) : records.length > 0 ? (
					<div className="space-y-4">
						<p className="max-w-3xl text-sm leading-6 text-dashboard-text-muted sm:text-base">
							Showing {records.length} quarterly balance sheet entries derived
							from the shared financial dataset for {selectedCompany}
						</p>
						{latestRecord ? (
							<SummaryCard
								record={latestRecord}
								filingDate={latestRecord.filing_date ?? 'N/A'}
							/>
						) : null}
						<BalanceSheetTrendChart records={records} />
						<CompanyFilingsTable records={records} />
					</div>
				) : (
					<div className="space-y-2">
						<p className="text-sm font-semibold text-dashboard-text">
							No records available
						</p>
						<p className="max-w-3xl text-sm leading-6 text-dashboard-text-muted sm:text-base">
							There are no financial records for{' '}
							{selectedCompany || 'the selected company'} in the current
							dataset.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
