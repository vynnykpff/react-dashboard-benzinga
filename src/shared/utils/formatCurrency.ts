const currencyFormatter = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	maximumFractionDigits: 1,
	style: 'currency',
	currency: 'USD',
})

export const formatCurrency = (value?: number) => {
	if (typeof value !== 'number') {
		return 'N/A'
	}

	return currencyFormatter.format(value)
}
