import * as React from "react";

import {getSettings} from "../settings";

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

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
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
});

interface PagingTableProps<T> {
	title: string;
	thead?: React.ReactNode;
	RowRenderer: React.FunctionComponent<{ item: T }>;
	items: T[];
}

function PagingTable<T>(props: PagingTableProps<T>) {
	const classes = useStyles();

	const [itemsPerPage, setItemsPerPage] = React.useState(getSettings().itemsPerPage);
	const [page, setPage] = React.useState(0);
	const [expanded, setExpanded] = React.useState(false);

	const numItems = props.items.length;
	const start = itemsPerPage * page;
	const end = Math.min(numItems, itemsPerPage * (page + 1));

	const handleItemsPerPageChange = (e: React.FormEvent<any>) => {
		const menuItemValue = Number((e.target as HTMLSelectElement).value);
		setItemsPerPage(menuItemValue);
		setPage(Math.floor(page * itemsPerPage / menuItemValue));
	};
	const handleChangePage = (_e: any, page: number) => {
		setPage(page);
	};

	const handleExpandClick = (_e: any) => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.card}>
			<CardContent
				onClick={handleExpandClick}
				className={classes.cardTitle}
			>
				<div style={{display: "flex"}}>
					<Typography
						variant="h5"
						component="h2"
						className={classes.cardTitleTitle}
					>
						{`${props.title}（${props.items.length} 件）`}
					</Typography>
					<div className={classes.flexGrow} />
					<IconButton style={{margin: "-8px 0"}}>
						{expanded
							? <ExpandLessIcon />
							: <ExpandMoreIcon />
						}
					</IconButton>
				</div>
			</CardContent>
			<Collapse in={expanded}>
				<div style={{overflowX: "auto"}}>
					{/* TODO: search bar */}
					<Table>
						{props.thead}
						{expanded &&
							<TableBody>
								{props.items.slice(start, end).map((item, idx) => (
									<props.RowRenderer item={item} key={idx} />
								))}
							</TableBody>
						}
						<TableFooter>
							<TableRow>
								<TablePagination
									labelRowsPerPage="ページあたりの行数:"
									rowsPerPage={itemsPerPage}
									rowsPerPageOptions={[10, 20, 50, 100]}
									onChangeRowsPerPage={handleItemsPerPageChange}
									labelDisplayedRows={({from, to, count}) => `${from}-${to} / ${count}`}
									count={numItems}
									page={page}
									onChangePage={handleChangePage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Collapse>
		</Card>
	);
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

interface SimpleColumnRowProps {
	columns: React.ReactNode[];
}

const useSimpleColumnRowStyles = makeStyles({
	cell: {
		paddingBottom: 0,
		paddingTop: 0,
	},
});

export const SimpleColumnRow = (params: SimpleColumnRowProps) => {
	const classes = useSimpleColumnRowStyles();
	return (
		<TableRow hover>
			{params.columns.map((column, i) => (
				<TableCell key={`${i}`} className={classes.cell}>
					{column}
				</TableCell>
			))}
		</TableRow>
	);
};

export default PagingTable;
