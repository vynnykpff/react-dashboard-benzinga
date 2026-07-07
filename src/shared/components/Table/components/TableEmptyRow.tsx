type TableEmptyRowProps = {
	colSpan: number
	message: string
}

export const TableEmptyRow = ({ colSpan, message }: TableEmptyRowProps) => (
	<tr>
		<td
			colSpan={colSpan}
			className="px-4 py-10 text-center text-dashboard-text-muted"
		>
			{message}
		</td>
	</tr>
)
