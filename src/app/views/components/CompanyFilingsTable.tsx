import { Table } from '@shared/components'

import type { FinancialRecord } from '@/app/hooks/useCompanyFinancials'
import { companyFilingsColumns } from '@/app/utils/constants'

type CompanyFilingsTableProps = {
	records: FinancialRecord[]
}

export const CompanyFilingsTable = ({ records }: CompanyFilingsTableProps) => {
	return (
		<div className="space-y-3">
			<div>
				<p className="text-sm font-semibold text-dashboard-text">All filings</p>
				<p className="text-sm text-dashboard-text-muted">
					Filings for the selected company
				</p>
			</div>
			<Table
				columns={companyFilingsColumns}
				data={records}
				getRowKey={row => row.rowId}
				defaultPageSize={10}
				emptyMessage="No filings available"
			/>
		</div>
	)
}
