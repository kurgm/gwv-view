import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";

export interface SubMenuProps {
	open: boolean;
	handleToggle: () => void;
	icon: React.ReactElement;
	title: string;
	sidebarIsOpen: boolean;
}

const useStyles = makeStyles((theme) => createStyles({
	icon: {
		minWidth: theme.spacing(5),
	},
	openList: {
		"& a": {
			paddingLeft: theme.spacing(4),
		},
	},
	closeList: {
		"& a": {
			paddingLeft: theme.spacing(2),
		},
	}
}));

const SubMenu: React.FC<SubMenuProps> = (props) => {
	const classes = useStyles();

	const parentItem = (
		<MenuItem button onClick={props.handleToggle}>
			<ListItemIcon className={classes.icon}>{props.open ? <ExpandMore /> : props.icon}</ListItemIcon>
			<Typography color="textSecondary">{props.title}</Typography>
		</MenuItem>
	);

	return (
		<>
			{props.sidebarIsOpen ? parentItem : (
				<Tooltip title={props.title} placement="right">
					{parentItem}
				</Tooltip>
			)}
			<Collapse in={props.open}>
				<List
					component="div"
					disablePadding
					className={props.sidebarIsOpen ? classes.openList : classes.closeList}
				>
					{props.children}
				</List>
			</Collapse>
		</>
	);
};

export default SubMenu;
