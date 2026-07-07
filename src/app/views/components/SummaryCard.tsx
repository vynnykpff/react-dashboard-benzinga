type FinancialSummaryCardsProps = {
	filingDate?: string
	record: {
		cash_and_short_term_equivalents?: number
		fiscal_quarter?: number
		fiscal_year?: number
		total_assets?: number
		total_equity?: number
		total_liabilities?: number
	}
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	maximumFractionDigits: 1,
	style: 'currency',
	currency: 'USD',
})

const formatCurrency = (value?: number) => {
	if (typeof value !== 'number') {
		return 'N/A'
	}

	return currencyFormatter.format(value)
}

export const SummaryCard = ({
	filingDate,
	record,
}: FinancialSummaryCardsProps) => {
	const summaryItems = [
		{ label: 'Total Assets', value: formatCurrency(record.total_assets) },
		{ label: 'Total Equity', value: formatCurrency(record.total_equity) },
		{
			label: 'Total Liabilities',
			value: formatCurrency(record.total_liabilities),
		},
		{
			label: 'Cash & Equivalents',
			value: formatCurrency(record.cash_and_short_term_equivalents),
		},
	]

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-dashboard-text">
						Most recent quarter
					</p>
					<p className="text-sm text-dashboard-text-muted">
						{typeof record.fiscal_year === 'number' &&
						typeof record.fiscal_quarter === 'number'
							? `FY${record.fiscal_year} Q${record.fiscal_quarter}`
							: 'Quarter unavailable'}
					</p>
				</div>
				<p className="text-sm text-dashboard-text-muted">
					Latest filing: {filingDate ?? 'N/A'}
				</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{summaryItems.map(item => (
					<div
						key={item.label}
						className="rounded-xl border border-dashboard-border bg-dashboard-panel px-4 py-4"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.16em] text-dashboard-text-muted">
							{item.label}
						</p>
						<p className="mt-2 text-2xl font-semibold tracking-tight text-dashboard-text">
							{item.value}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
