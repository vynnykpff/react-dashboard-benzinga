import { Table } from '@shared/components'

import type { FinancialRecord } from '@/app/hooks/useCompanyFinancials'
import { companyFilingsColumns } from '@/app/utils/constants'

type CompanyFilingsTableProps = {
	records: FinancialRecord[]
}

const hasLiabilitiesAboveAssets = (record: FinancialRecord) =>
	(record.total_liabilities ?? 0) > (record.total_assets ?? 0)

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
				getRowClassName={row =>
					hasLiabilitiesAboveAssets(row)
						? 'bg-dashboard-warning/10 hover:bg-dashboard-warning/15'
						: undefined
				}
				defaultPageSize={10}
				emptyMessage="No filings available"
			/>
		</div>
	)
}
