import type { TableColumn } from '@shared/components'
import { formatCurrency } from '@shared/utils'

import type { FinancialRecord } from '@/app/hooks/useCompanyFinancials'

const getPeriodSortValue = (record: FinancialRecord) =>
	(record.fiscal_year ?? 0) * 10 + (record.fiscal_quarter ?? 0)

export const companyFilingsColumns: TableColumn<FinancialRecord>[] = [
	{
		id: 'fiscal_year',
		header: 'Fiscal Year',
		accessor: 'fiscal_year',
		sortable: true,
		sortValue: getPeriodSortValue,
	},
	{
		id: 'fiscal_quarter',
		header: 'Quarter',
		accessor: row => `Q${row.fiscal_quarter ?? 'N/A'}`,
		sortable: true,
		sortValue: getPeriodSortValue,
	},
	{
		id: 'total_assets',
		header: 'Total Assets',
		accessor: row => formatCurrency(row.total_assets),
		sortable: true,
		sortValue: row => row.total_assets,
		headerClassName: 'text-right',
		className: 'text-right tabular-nums',
	},
	{
		id: 'total_liabilities',
		header: 'Total Liabilities',
		accessor: row => formatCurrency(row.total_liabilities),
		sortable: true,
		sortValue: row => row.total_liabilities,
		headerClassName: 'text-right',
		className: 'text-right tabular-nums',
	},
	{
		id: 'total_equity',
		header: 'Total Equity',
		accessor: row => formatCurrency(row.total_equity),
		sortable: true,
		sortValue: row => row.total_equity,
		headerClassName: 'text-right',
		className: 'text-right tabular-nums',
	},
	{
		id: 'cash_and_short_term_equivalents',
		header: 'Cash & Equiv.',
		accessor: row => formatCurrency(row.cash_and_short_term_equivalents),
		sortable: true,
		sortValue: row => row.cash_and_short_term_equivalents,
		headerClassName: 'text-right',
		className: 'text-right tabular-nums',
	},
	{
		id: 'long_term_debt_obligations',
		header: 'Long-Term Debt',
		accessor: row => formatCurrency(row.long_term_debt_obligations),
		sortable: true,
		sortValue: row => row.long_term_debt_obligations,
		headerClassName: 'text-right',
		className: 'text-right tabular-nums',
	},
]
