import * as React from "react";

import { getSettings } from "../settings";

import Card, { CardActions, CardContent } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu"; // should be SelectField
import Typography from "material-ui/Typography";

import Collapse from "material-ui/transitions/Collapse";

import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import KeyboardArrowLeft from "material-ui/svg-icons/keyboard-arrow-left";
import KeyboardArrowRight from "material-ui/svg-icons/keyboard-arrow-right";

interface IPagingTableProps<T> {
	title: string;
	thead?: React.ReactNode;
	tfoot?: React.ReactNode;
	RowRenderer: React.SFC<{ item: T; }>;
	items: T[];
}

interface IPagingTableState {
	expanded: boolean;
	itemsPerPage: number;
	itemsPerPageMenuOpen: boolean;
	page: number;
}

class PagingTable<T> extends React.Component<IPagingTableProps<T>, IPagingTableState> {
	public state: Readonly<IPagingTableState> = {
		expanded: false,
		itemsPerPage: getSettings().itemsPerPage,
		itemsPerPageMenuOpen: false,
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
				<CardContent
					onClick={this.handleExpandClick}
					style={styles.cardTitle}
				>
					<Typography
						type="headline"
						component="h2"
						style={styles.cardTitleTitle}
					>
						{`${this.props.title}（${this.props.items.length} 件）`}
					</Typography>
					<IconButton>
						{/* TODO: expand less */}
						<ExpandMoreIcon />
					</IconButton>
				</CardContent>
				<Collapse in={this.state.expanded}>
					<div>
						<CardContent>
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
						</CardContent>
						<CardActions style={styles.pager}>
							<span style={{
								margin: 0,
							}}>
								ページあたりの行数:
							</span>
							<span onClick={this.handleItemsPerPageMenuOpen}>
								{/* FIXME */}
								{this.state.itemsPerPage}
							</span>
							<Menu
								onRequestClose={this.handleItemsPerPageMenuChange}
								open={this.state.itemsPerPageMenuOpen}
							// labelStyle={{
							// 	color: "inherit",
							// }}
							// style={{
							// 	fontSize: "inherit",
							// 	marginRight: 4,
							// 	position: "relative",
							// 	top: -4,
							// 	verticalAlign: "middle",
							// }}
							// underlineStyle={{
							// 	borderTop: "none",
							// }}
							// iconStyle={{
							// 	fill: "inherit",
							// }}
							>
								{[10, 20, 50, 100].map((n) => (
									<MenuItem
										selected={n === this.state.itemsPerPage}
										key={n}
										onClick={(_e: React.MouseEvent<any>) => this.handleItemsPerPageMenuItemClick(n)}
									>
										{n}
									</MenuItem>
								))}
							</Menu>
							<span style={{
								margin: "0 20px 0 0",
							}}>
								{start + 1}-{end} / {numItems}
							</span>
							<IconButton
								style={styles.pagerButton}
								onClick={this.handleBackButton}
								disabled={this.state.page <= 0}
								// iconStyle={styles.pagerButtonIcon}
							>
								<KeyboardArrowLeft />
							</IconButton>
							<IconButton
								style={styles.pagerButton}
								onClick={this.handleNextButton}
								disabled={this.state.page >= maxPage}
								// iconStyle={styles.pagerButtonIcon}
							>
								<KeyboardArrowRight />
							</IconButton>
						</CardActions>
					</div>
				</Collapse>
			</Card>
		);
	}

	private getStyles() {
		return {
			card: {
				margin: 8,
			} as React.CSSProperties,
			cardTitle: {
				cursor: "pointer",
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

	private handleItemsPerPageMenuOpen = (_e: any) => {
		this.setState({
			itemsPerPageMenuOpen: true,
		});
	}

	private handleItemsPerPageMenuChange = (_e: any) => {
		this.setState({
			itemsPerPageMenuOpen: false,
		});
	}
	private handleItemsPerPageMenuItemClick = (menuItemValue: any) => {
		this.setState({
			itemsPerPage: menuItemValue,
			itemsPerPageMenuOpen: false,
			page: Math.floor(this.state.page * this.state.itemsPerPage / menuItemValue),
		});
	}
	private handleBackButton = (_e: any) => {
		this.setState({
			page: this.state.page - 1,
		});
	}
	private handleNextButton = (_e: any) => {
		this.setState({
			page: this.state.page + 1,
		});
	}

	private handleExpandClick = (_e: any) => {
		this.setState({
			expanded: !this.state.expanded,
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
