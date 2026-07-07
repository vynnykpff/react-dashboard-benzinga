import { useMemo } from 'react'
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceDot,
	XAxis,
	YAxis,
} from 'recharts'

import type { ChartConfig } from '@shared/components/ui/chart'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@shared/components/ui/chart'
import { formatCurrency } from '@shared/utils'

import type { FinancialRecord } from '@/app/hooks/useCompanyFinancials'

type BalanceSheetTrendChartProps = {
	records: FinancialRecord[]
}

type TrendChartPoint = {
	period: string
	sortValue: number
	totalAssets: number
	totalLiabilities: number
	totalEquity: number
	debtToEquity: number | null
	hasLiabilitiesAboveAssets: boolean
}

const chartConfig = {
	totalAssets: {
		label: 'Total Assets',
		color: 'var(--dashboard-accent)',
	},
	totalLiabilities: {
		label: 'Total Liabilities',
		color: 'var(--dashboard-negative)',
	},
	totalEquity: {
		label: 'Total Equity',
		color: 'var(--dashboard-positive)',
	},
	debtToEquity: {
		label: 'Debt-to-Equity',
		color: 'var(--dashboard-warning)',
	},
} satisfies ChartConfig

const formatPeriod = (record: FinancialRecord) =>
	`FY${record.fiscal_year} Q${record.fiscal_quarter}`

const currencyTickFormatter = (value: number) => formatCurrency(value)

const ratioTickFormatter = (value: number) => `${value.toFixed(1)}x`

const formatTooltipValue = (value: unknown, dataKey: string | number) => {
	const numericValue = Number(value)

	if (Number.isNaN(numericValue)) {
		return 'N/A'
	}

	if (dataKey === 'debtToEquity') {
		return `${numericValue.toFixed(2)}x`
	}

	return formatCurrency(numericValue)
}

export const BalanceSheetTrendChart = ({
	records,
}: BalanceSheetTrendChartProps) => {
	const chartData = useMemo(() => {
		const recordsByQuarter = new Map<string, TrendChartPoint>()

		records.forEach(record => {
			const period = formatPeriod(record)

			if (recordsByQuarter.has(period)) {
				return
			}

			const totalEquity = record.total_equity ?? 0
			const totalLiabilities = record.total_liabilities ?? 0

			recordsByQuarter.set(period, {
				period,
				sortValue: record.fiscal_year * 10 + record.fiscal_quarter,
				totalAssets: record.total_assets ?? 0,
				totalLiabilities,
				totalEquity,
				debtToEquity:
					totalEquity !== 0 ? totalLiabilities / totalEquity : null,
				hasLiabilitiesAboveAssets:
					totalLiabilities > (record.total_assets ?? 0),
			})
		})

		return Array.from(recordsByQuarter.values()).sort(
			(leftPoint, rightPoint) => leftPoint.sortValue - rightPoint.sortValue,
		)
	}, [records])

	const liabilityWarningPoints = useMemo(
		() => chartData.filter(point => point.hasLiabilitiesAboveAssets),
		[chartData],
	)

	return (
		<div className="space-y-4 rounded-2xl border border-dashboard-border bg-dashboard-panel px-4 py-5 sm:px-5">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-dashboard-text">
						Balance sheet trend
					</p>
					<p className="text-sm text-dashboard-text-muted">
						Quarterly totals by fiscal period
					</p>
				</div>
				<div
					className={
						liabilityWarningPoints.length > 0
							? 'flex items-center gap-2 rounded-full border border-dashboard-warning/35 bg-dashboard-warning/10 px-3 py-1 text-xs font-medium text-dashboard-warning'
							: 'flex items-center gap-2 rounded-full border border-dashboard-border bg-dashboard-muted/60 px-3 py-1 text-xs font-medium text-dashboard-text-muted'
					}
				>
					{liabilityWarningPoints.length > 0 ? (
						<>
							<span className="h-2 w-2 rounded-full bg-dashboard-warning" />
							{liabilityWarningPoints.length}{' '}
							{liabilityWarningPoints.length === 1 ? 'quarter' : 'quarters'}{' '}
							liabilities &gt; assets
						</>
					) : (
						<>
							<span className="h-2 w-2 rounded-full bg-dashboard-positive" />
							No liabilities &gt; assets
						</>
					)}
				</div>
			</div>
			<ChartContainer
				config={chartConfig}
				className="h-80 w-full aspect-auto"
			>
				<LineChart
					accessibilityLayer
					data={chartData}
					margin={{ top: 8, right: 12, left: 12, bottom: 8 }}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="period"
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						minTickGap={24}
					/>
					<YAxis
						yAxisId="currency"
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						width={64}
						tickFormatter={currencyTickFormatter}
					/>
					<YAxis
						yAxisId="ratio"
						orientation="right"
						tickLine={false}
						axisLine={false}
						tickMargin={10}
						width={44}
						tickFormatter={ratioTickFormatter}
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								indicator="line"
								labelFormatter={value => value}
								formatter={(value, dataKey) =>
									formatTooltipValue(value, dataKey)
								}
							/>
						}
					/>
					<ChartLegend content={<ChartLegendContent />} />
					<Line
						yAxisId="currency"
						dataKey="totalAssets"
						type="monotone"
						stroke="var(--color-totalAssets)"
						strokeWidth={2}
						dot={false}
					/>
					<Line
						yAxisId="currency"
						dataKey="totalLiabilities"
						type="monotone"
						stroke="var(--color-totalLiabilities)"
						strokeWidth={2}
						dot={false}
					/>
					<Line
						yAxisId="currency"
						dataKey="totalEquity"
						type="monotone"
						stroke="var(--color-totalEquity)"
						strokeWidth={2}
						dot={false}
					/>
					<Line
						yAxisId="ratio"
						dataKey="debtToEquity"
						type="monotone"
						stroke="var(--color-debtToEquity)"
						strokeWidth={2}
						strokeDasharray="4 4"
						dot={false}
						connectNulls
					/>
					{liabilityWarningPoints.map(point => (
						<ReferenceDot
							key={point.period}
							yAxisId="currency"
							x={point.period}
							y={point.totalLiabilities}
							r={5}
							fill="var(--dashboard-warning)"
							stroke="var(--dashboard-panel)"
							strokeWidth={2}
						/>
					))}
				</LineChart>
			</ChartContainer>
		</div>
	)
}
