import * as React from "react";

import { Card, CardMedia, CardTitle } from "material-ui/Card";

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
		const { itemsPerPage, page } = this.state;
		const start = itemsPerPage * page;
		const end = itemsPerPage * (page + 1);

		const styles = this.getStyles();
		return (
			<Card style={styles.card}>
				<CardTitle
					actAsExpander
					showExpandableButton
					title={this.props.title}
					style={styles.cardTitle}
					titleStyle={styles.cardTitleTitle}
				/>
				<CardMedia expandable>
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
				</CardMedia>
			</Card>
		);
	}

	private getStyles() {
		return {
			card: {
				margin: 8,
			} as React.CSSProperties,
			cardTitle: {
				padding: "16px 14px 16px 24px",
			} as React.CSSProperties,
			cardTitleTitle: {
				fontSize: 20,
				lineHeight: "32px",
				paddingRight: 48,
			} as React.CSSProperties,
		};
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
