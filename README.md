# React Dashboard Benzinga

A Vite + React + TypeScript dashboard for browsing quarterly company financials from the local `financials.json` dataset.

The dashboard lets users choose a company symbol, inspect the latest balance sheet summary, review all quarterly filings, and visualize balance sheet trends over time.

## Getting Started

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm build
```

## Data

Financial records live in:

```text
src/shared/data/financials.json
```

The app groups records by `symbols`, so the selected company drives both the cards, chart, and filings table.

A synthetic `TEST` symbol is included for visual QA. It has multiple quarters, including quarters where:

```ts
total_liabilities > total_assets
```

Use `TEST` to verify the chart warning markers and highlighted table rows.

## Component Structure

```text
src/app/views/App.tsx
```

Top-level dashboard composition. It calls `useCompanyFinancials()` and passes selected-company state into the header and workspace.

```text
src/app/hooks/useCompanyFinancials.ts
```

Loads and groups the local financial dataset by company symbol. It owns:

- company options for the selector
- selected company state
- loading state
- latest record
- selected company records

```text
src/app/views/components/DashboardHeader.tsx
```

Header area with the company selector and theme control.

```text
src/app/views/components/DashboardWorkspaceSection.tsx
```

Main content shell. It handles loading, empty state, summary cards, the trend chart, and the filings table.

```text
src/app/views/components/SummaryCard.tsx
```

Displays the latest quarter's key figures: total assets, total equity, total liabilities, and cash equivalents.

```text
src/app/views/components/BalanceSheetTrendChart.tsx
```

Shadcn/Recharts trend chart showing:

- Total Assets
- Total Liabilities
- Total Equity
- Debt-to-Equity ratio, derived as `total_liabilities / total_equity`

The chart plots currency values on the left axis and the debt-to-equity ratio on a secondary right axis.

Quarters where liabilities exceed assets are highlighted with warning dots on the liabilities line.

```text
src/app/views/components/CompanyFilingsTable.tsx
```

Table of all selected-company filings. Rows are warning-highlighted when:

```ts
total_liabilities > total_assets
```

The table intentionally does not show extra warning copy; the row color is the only table-level indicator.

```text
src/shared/components/Table
```

Reusable table primitives with sorting, pagination, empty state, loading state, and optional row-level class hooks.

```text
src/shared/components/ui/chart.tsx
```

Local shadcn-style chart wrapper around Recharts. It provides `ChartContainer`, tooltip, and legend primitives used by the trend chart.

## Tradeoffs

- `recharts` was added because shadcn's chart pattern wraps Recharts rather than providing a standalone charting engine.
- The trend chart uses one combined chart instead of separate cards so balance-sheet totals and debt-to-equity can be compared by fiscal quarter in one place.
- Debt-to-equity uses a secondary right axis because it is a ratio, while assets/liabilities/equity are currency values.
- Highlighted liability-over-asset quarters use point markers instead of shaded chart regions. The x-axis is categorical fiscal quarters, so point markers are precise and avoid clutter.
- The table highlight uses row color only, per product preference, while the chart keeps a small status badge and markers.
- Duplicate fiscal periods are de-duplicated in the chart by fiscal year and quarter so repeated filings do not create duplicate chart points. The table still shows all records.
- Missing numeric values are treated as `0` for chart plotting. Display formatting still shows `N/A` where the table formatter receives missing values.
- The synthetic `TEST` data is intentionally unrealistic because it exists to exercise UI edge cases that the provided real dataset does not contain.
