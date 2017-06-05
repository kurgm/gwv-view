import * as React from "react";

import { getSettings } from "../settings";

import { TouchTapEvent } from "material-ui";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import DropDownMenu from "material-ui/DropDownMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";

import HardwareKeyboardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import HardwareKeyboardArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";

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
	public state: Readonly<IPagingTableState> = {
		itemsPerPage: getSettings().itemsPerPage,
		page: 0,
	};

	public render() {
		const { itemsPerPage, page } = this.state;
		const numItems = this.props.items.length;
		const start = itemsPerPage * page;
		const end = Math.min(numItems, itemsPerPage * (page + 1));
		const maxPage = Math.ceil(numItems / itemsPerPage) - 1;

		const styles = this.getStyles();
		return (
			<Card style={styles.card}>
				<CardTitle
					actAsExpander
					showExpandableButton
					title={`${this.props.title}（${this.props.items.length} 件）`}
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
				</CardMedia>
				<CardActions expandable style={styles.pager}>
					<span style={{
						margin: 0,
					}}>
						ページあたりの行数:
					</span>
					<DropDownMenu
						value={this.state.itemsPerPage}
						onChange={this.handleDropDownMenuChange}
						labelStyle={{
							color: "inherit",
						}}
						style={{
							fontSize: "inherit",
							marginRight: 4,
							position: "relative",
							top: -4,
							verticalAlign: "middle",
						}}
						underlineStyle={{
							borderTop: "none",
						}}
						iconStyle={{
							fill: "inherit",
						}}
					>
						{[10, 20, 50, 100].map((n) => (
							<MenuItem
								value={n}
								primaryText={n}
								key={n}
							/>
						))}
					</DropDownMenu>
					<span style={{
						margin: "0 20px 0 0",
					}}>
						{start + 1}-{end} / {numItems}
					</span>
					<IconButton
						style={styles.pagerButton}
						onTouchTap={this.handleBackButton}
						disabled={this.state.page <= 0}
						iconStyle={styles.pagerButtonIcon}
					>
						<HardwareKeyboardArrowLeft />
					</IconButton>
					<IconButton
						style={styles.pagerButton}
						onTouchTap={this.handleNextButton}
						disabled={this.state.page >= maxPage}
						iconStyle={styles.pagerButtonIcon}
					>
						<HardwareKeyboardArrowRight />
					</IconButton>
				</CardActions>
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
			pager: {
				color: "rgba(0, 0, 0, .54)",
				fill: "rgba(0, 0, 0, .54)",
				fontSize: 12,
				height: 48,
				padding: "4px 2px",
				textAlign: "right",
			} as React.CSSProperties,
			pagerButton: {
				marginRight: 0,
				verticalAlign: "middle",
			} as React.CSSProperties,
			pagerButtonIcon: {
				color: "rgba(0, 0, 0, .54)",
				fill: "rgba(0, 0, 0, .54)",
			} as React.CSSProperties,
		};
	}

	private handleDropDownMenuChange = (_e: TouchTapEvent, _index: number, menuItemValue: any) => {
		this.setState({
			itemsPerPage: menuItemValue,
			page: Math.floor(this.state.page * this.state.itemsPerPage / menuItemValue),
		});
	}
	private handleBackButton = (_e: TouchTapEvent) => {
		this.setState({
			page: this.state.page - 1,
		});
	}
	private handleNextButton = (_e: TouchTapEvent) => {
		this.setState({
			page: this.state.page + 1,
		});
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
