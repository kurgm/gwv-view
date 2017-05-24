import * as React from "react";

interface IPagingTableProps<T> {
	title: string;
	thead?: React.ReactNode;
	tfoot?: React.ReactNode;
	RowRenderer: React.SFC<{ item: T; }>;
	items: T[];
}

interface IPagingTableState {
	itemsPerPage: number;
	page: number;
}

class PagingTable<T> extends React.Component<IPagingTableProps<T>, IPagingTableState> {
	public state = {
		itemsPerPage: 10,
		page: 0,
	};

	public render() {
		const {itemsPerPage, page} = this.state;
		const start = itemsPerPage * page;
		const end = itemsPerPage * (page + 1);
		return (
			<div>
				<h2>{this.props.title}</h2>
				{/* TODO: search bar */}
				<table className="data">
					{this.props.thead}
					<tbody>
						{this.props.items.slice(start, end).map((item, idx) => (
							<this.props.RowRenderer item={item} key={idx} />
						))}
					</tbody>
					{this.props.tfoot}
				</table>
				{/* TODO: pager */}
			</div>
		);
	}
}

export const SimpleColumnHeader = (params: { columns: React.ReactNode[] }) => (
	<tr>
		{params.columns.map((column, i) => (
			<th key={`${i}`}>
				{column}
			</th>
		))}
	</tr>
);

export const SimpleColumnRow = (params: { columns: React.ReactNode[] }) => (
	<tr>
		{params.columns.map((column, i) => (
			<td key={`${i}`}>
				{column}
			</td>
		))}
	</tr>
);

export default PagingTable;
