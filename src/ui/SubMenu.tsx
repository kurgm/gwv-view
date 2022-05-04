import * as React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSidebarState } from "react-admin";

export interface SubMenuProps {
	open: boolean;
	handleToggle: () => void;
	icon: React.ReactElement;
	title: string;
	dense?: boolean;
	selected?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
	const [sidebarIsOpen] = useSidebarState();

	const parentItem = (
		<MenuItem
			onClick={props.handleToggle}
			dense={props.dense}
			selected={props.selected}
		>
			<ListItemIcon
				sx={{
					minWidth: (theme) => theme.spacing(5),
				}}
			>
				{props.open ? <ExpandMore /> : props.icon}
			</ListItemIcon>
			<Typography color="textSecondary">{props.title}</Typography>
		</MenuItem>
	);

	return (
		<>
			{sidebarIsOpen ? parentItem : (
				<Tooltip title={props.title} placement="right">
					{parentItem}
				</Tooltip>
			)}
			<Collapse in={props.open} mountOnEnter unmountOnExit>
				<List
					component="div"
					dense={props.dense}
					disablePadding
					sx={{
						"& a": {
							paddingLeft: (theme) => sidebarIsOpen ? theme.spacing(4) : theme.spacing(2),
						},
					}}
				>
					{props.children}
				</List>
			</Collapse>
		</>
	);
};

export default SubMenu;
