import * as React from "react";

import { getSettings } from "../settings";

import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";

import Collapse from "@material-ui/core/Collapse/Collapse";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

const styles = {
	card: {
		margin: 8,
	},
	cardTitle: {
		cursor: "pointer",
		padding: "16px 14px 16px 24px",
	},
	cardTitleTitle: {
		fontSize: 20,
		lineHeight: "32px",
	},
	flexGrow: {
		flex: "1 1 auto",
	},
};

interface IPagingTableProps<T> {
	title: string;
	thead?: React.ReactNode;
	RowRenderer: React.SFC<{ item: T; }>;
	items: T[];
}

interface IPagingTableState {
	expanded: boolean;
	itemsPerPage: number;
	page: number;
}

class PagingTable<T> extends React.Component<
	IPagingTableProps<T> & WithStyles<keyof typeof styles>, IPagingTableState> {
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

		return (
			<Card className={this.props.classes.card}>
				<CardContent
					onClick={this.handleExpandClick}
					className={this.props.classes.cardTitle}
				>
					<div style={{ display: "flex" }}>
						<Typography
							variant="h5"
							component="h2"
							className={this.props.classes.cardTitleTitle}
						>
							{`${this.props.title}（${this.props.items.length} 件）`}
						</Typography>
						<div className={this.props.classes.flexGrow} />
						<IconButton style={{ margin: "-8px 0" }}>
							{this.state.expanded
								? <ExpandLessIcon />
								: <ExpandMoreIcon />
							}
						</IconButton>
					</div>
				</CardContent>
				<Collapse in={this.state.expanded}>
					<div style={{ overflowX: "auto" }}>
						{/* TODO: search bar */}
						<Table>
							{this.props.thead}
							{this.state.expanded &&
								<TableBody>
									{this.props.items.slice(start, end).map((item, idx) => (
										<this.props.RowRenderer item={item} key={idx} />
									))}
								</TableBody>
							}
							<TableFooter>
								<TableRow>
									<TablePagination
										labelRowsPerPage="ページあたりの行数:"
										rowsPerPage={itemsPerPage}
										rowsPerPageOptions={[10, 20, 50, 100]}
										onChangeRowsPerPage={this.handleItemsPerPageChange}
										labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
										count={numItems}
										page={page}
										onChangePage={this.handleChangePage}
									/>
								</TableRow>
							</TableFooter>
						</Table>
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
	private handleChangePage = (_e: any, page: number) => {
		this.setState({ page });
	}

	private handleExpandClick = (_e: any) => {
		this.setState({
			expanded: !this.state.expanded,
		});
	}
}

export const SimpleColumnHeader = (params: { columns: React.ReactNode[] }) => (
	<TableRow>
		{params.columns.map((column, i) => (
			<TableCell key={`${i}`}>
				{column}
			</TableCell>
		))}
	</TableRow>
);

interface ISimpleColumnRowProps {
	columns: React.ReactNode[];
}

const simpleColumnRowStyles = {
	cell: {
		paddingBottom: 0,
		paddingTop: 0,
	},
};

export const SimpleColumnRow = withStyles(simpleColumnRowStyles)(
	(params: ISimpleColumnRowProps & WithStyles<keyof typeof simpleColumnRowStyles>) => (
		<TableRow hover>
			{params.columns.map((column, i) => (
				<TableCell key={`${i}`} className={params.classes.cell}>
					{column}
				</TableCell>
			))}
		</TableRow>
	));

export default withStyles(styles)(PagingTable);
