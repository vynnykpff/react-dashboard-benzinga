import { useEffect, useState } from 'react'

import type { SelectorOption } from '@shared/components'
import { financials } from '@shared/data'

export type FinancialRecord = (typeof financials)[number]

const compareFinancialRecords = (
	leftRecord: FinancialRecord,
	rightRecord: FinancialRecord,
) => {
	if (leftRecord.fiscal_year !== rightRecord.fiscal_year) {
		return rightRecord.fiscal_year - leftRecord.fiscal_year
	}

	if (leftRecord.fiscal_quarter !== rightRecord.fiscal_quarter) {
		return rightRecord.fiscal_quarter - leftRecord.fiscal_quarter
	}

	return rightRecord.filing_date.localeCompare(leftRecord.filing_date)
}

const financialsByCompany = financials.reduce<Record<string, FinancialRecord[]>>(
	(groupedFinancials, record) => {
		record.symbols.forEach(symbol => {
			if (!groupedFinancials[symbol]) {
				groupedFinancials[symbol] = []
			}

			groupedFinancials[symbol].push(record)
			groupedFinancials[symbol].sort(compareFinancialRecords)
		})

		return groupedFinancials
	},
	{},
)

const companyOptions: SelectorOption[] = Object.keys(financialsByCompany)
	.sort((left, right) => left.localeCompare(right))
	.map(symbol => ({
		value: symbol,
		label: symbol,
		description: `${financialsByCompany[symbol]?.length ?? 0} reports`,
	}))

export const useCompanyFinancials = () => {
	const [selectedCompany, setSelectedCompany] = useState(
		companyOptions[0]?.value ?? '',
	)
	const [records, setRecords] = useState<FinancialRecord[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setRecords(selectedCompany ? financialsByCompany[selectedCompany] ?? [] : [])
			setIsLoading(false)
		}, 650)

		return () => window.clearTimeout(timeoutId)
	}, [selectedCompany])

	const handleCompanyChange = (value: string) => {
		setSelectedCompany(value)
		setIsLoading(true)
	}

	return {
		companyOptions,
		isLoading,
		latestRecord: records[0] ?? null,
		records,
		selectedCompany,
		setSelectedCompany: handleCompanyChange,
	}
}
