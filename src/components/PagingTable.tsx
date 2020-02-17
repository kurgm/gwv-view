import * as React from "react";

import {getSettings} from "../settings";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Collapse from "@material-ui/core/Collapse";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CheckIcon from '@material-ui/icons/Check';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

import {makeStyles} from "@material-ui/core/styles";

import MaterialTable, {Column, Icons} from "material-table";

const tableIcons: Icons = {
	Add: React.forwardRef(function AddBox(props, ref) {return <AddBoxIcon {...props} ref={ref} />;}),
	Check: React.forwardRef(function Check(props, ref) {return <CheckIcon {...props} ref={ref} />;}),
	Clear: React.forwardRef(function Clear(props, ref) {return <ClearIcon {...props} ref={ref} />;}),
	Delete: React.forwardRef(function DeleteOutline(props, ref) {return <DeleteOutlineIcon {...props} ref={ref} />;}),
	DetailPanel: React.forwardRef(function ChevronRight(props, ref) {return <ChevronRightIcon {...props} ref={ref} />;}),
	Edit: React.forwardRef(function Edit(props, ref) {return <EditIcon {...props} ref={ref} />;}),
	Export: React.forwardRef(function SaveAlt(props, ref) {return <SaveAltIcon {...props} ref={ref} />;}),
	Filter: React.forwardRef(function FilterList(props, ref) {return <FilterListIcon {...props} ref={ref} />;}),
	FirstPage: React.forwardRef(function FirstPage(props, ref) {return <FirstPageIcon {...props} ref={ref} />;}),
	LastPage: React.forwardRef(function LastPage(props, ref) {return <LastPageIcon {...props} ref={ref} />;}),
	NextPage: React.forwardRef(function ChevronRight(props, ref) {return <ChevronRightIcon {...props} ref={ref} />;}),
	PreviousPage: React.forwardRef(function ChevronLeft(props, ref) {return <ChevronLeftIcon {...props} ref={ref} />;}),
	ResetSearch: React.forwardRef(function Clear(props, ref) {return <ClearIcon {...props} ref={ref} />;}),
	Search: React.forwardRef(function Search(props, ref) {return <SearchIcon {...props} ref={ref} />;}),
	SortArrow: React.forwardRef(function ArrowDownward(props, ref) {return <ArrowDownwardIcon {...props} ref={ref} />;}),
	ThirdStateCheck: React.forwardRef(function Remove(props, ref) {return <RemoveIcon {...props} ref={ref} />;}),
	ViewColumn: React.forwardRef(function ViewColumn(props, ref) {return <ViewColumnIcon {...props} ref={ref} />;}),
};

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

interface PagingTableProps<T extends object> {
	title: string;
	columns: Column<T>[]; 
	items: T[];
}

function PagingTable<T extends object>(props: PagingTableProps<T>) {
	const classes = useStyles();

	const [itemsPerPage, setItemsPerPage] = React.useState(getSettings().itemsPerPage);
	const [expanded, setExpanded] = React.useState(false);

	const handleItemsPerPageChange = (menuItemValue: number) => {
		setItemsPerPage(menuItemValue);
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
				{expanded &&
					<MaterialTable
						columns={props.columns}
						data={props.items}
						icons={tableIcons}
						components={{
							Container(props) {return <div {...props} />;},
						}}
						localization={{
							body: {
								emptyDataSourceMessage: "表示するデータがありません",
							},
							pagination: {
								labelDisplayedRows: "{from}-{to} / {count}",
								labelRowsSelect: "行",
								labelRowsPerPage: "ページあたりの行数:",
								firstTooltip: "最初のページ",
								previousTooltip: "前のページ",
								nextTooltip: "次のページ",
								lastTooltip: "最後のページ",
							},
						}}
						options={{
							emptyRowsWhenPaging: false,
							toolbar: false,
							pageSize: itemsPerPage,
							pageSizeOptions: [10, 20, 50, 100],
						}}
						onChangeRowsPerPage={handleItemsPerPageChange}
					/>
				}
			</Collapse>
		</Card>
	);
}

export default PagingTable;
