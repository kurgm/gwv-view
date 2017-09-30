import * as React from "react";

import { getSettings } from "../settings";

import Card, { CardActions, CardContent } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Input from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Typography from "material-ui/Typography";

import Collapse from "material-ui/transitions/Collapse";

import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";

import { StyledComponentProps } from "material-ui";
import withStyles from "material-ui/styles/withStyles";

const styles = {
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
	} as React.CSSProperties,
	flexGrow: {
		flex: "1 1 auto",
	} as React.CSSProperties,
	pager: {
		color: "rgba(0, 0, 0, .54)",
		fill: "rgba(0, 0, 0, .54)",
		fontSize: 12,
		padding: 2,
	} as React.CSSProperties,
	pagerButton: {
		margin: 0,
		verticalAlign: "middle",
	} as React.CSSProperties,
	pagerSelect: {
		margin: 0,
		textAlign: "right",
	} as React.CSSProperties,
	pagerSelectInput: {
		color: "rgba(0, 0, 0, .54)",
		paddingRight: 24,
		width: 48,
	} as React.CSSProperties,
};

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
	page: number;
}

class PagingTable<T> extends React.Component<
	IPagingTableProps<T> & StyledComponentProps<keyof typeof styles>, IPagingTableState> {
	public state: Readonly<IPagingTableState> = {
		expanded: false,
		itemsPerPage: getSettings().itemsPerPage,
		page: 0,
	};

	public render() {
		const { itemsPerPage, page } = this.state;
		const numItems = this.props.items.length;
		const start = itemsPerPage * page;
		const end = Math.min(numItems, itemsPerPage * (page + 1));
		const maxPage = Math.ceil(numItems / itemsPerPage) - 1;

		return (
			<Card className={this.props.classes!.card}>
				<CardContent
					onClick={this.handleExpandClick}
					className={this.props.classes!.cardTitle}
				>
					<div style={{ display: "flex" }}>
						<Typography
							type="headline"
							component="h2"
							className={this.props.classes!.cardTitleTitle}
						>
							{`${this.props.title}（${this.props.items.length} 件）`}
						</Typography>
						<div className={this.props.classes!.flexGrow} />
						<IconButton style={{ margin: "-8px 0" }}>
							{/* TODO: expand less */}
							<ExpandMoreIcon />
						</IconButton>
					</div>
				</CardContent>
				<Collapse in={this.state.expanded}>
					<div>
						{/* TODO: search bar */}
						<table className="data">
							{this.props.thead}
							{this.state.expanded &&
								<tbody>
									{this.props.items.slice(start, end).map((item, idx) => (
										<this.props.RowRenderer item={item} key={idx} />
									))}
								</tbody>
							}
							{this.props.tfoot}
						</table>
						<CardActions className={this.props.classes!.pager}>
							<div className={this.props.classes!.flexGrow} />
							<span style={{
								margin: 0,
							}}>
								ページあたりの行数:
							</span>
							<Select
								value={this.state.itemsPerPage}
								onChange={this.handleItemsPerPageChange}
								input={
									<Input
										inputProps={{
											className: this.props.classes!.pagerSelectInput,
										}}
									/>
								}
								className={this.props.classes!.pagerSelect}
								disableUnderline
							>
								{[10, 20, 50, 100].map((n) => (
									<MenuItem
										key={n}
										value={n}
									>
										{n}
									</MenuItem>
								))}
							</Select>
							<span style={{
								margin: "0 20px 0 32px",
							}}>
								{start + 1}-{end} / {numItems}
							</span>
							<IconButton
								className={this.props.classes!.pagerButton}
								onClick={this.handleBackButton}
								disabled={this.state.page <= 0}
							>
								<KeyboardArrowLeft />
							</IconButton>
							<IconButton
								className={this.props.classes!.pagerButton}
								onClick={this.handleNextButton}
								disabled={this.state.page >= maxPage}
							>
								<KeyboardArrowRight />
							</IconButton>
						</CardActions>
					</div>
				</Collapse>
			</Card>
		);
	}

	private handleItemsPerPageChange = (e: React.FormEvent<any>) => {
		const menuItemValue = +(e.target as HTMLSelectElement).value;
		this.setState({
			itemsPerPage: menuItemValue,
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

export default withStyles(styles)(PagingTable);
