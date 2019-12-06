import * as React from "react";

import {useLocation} from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Divider from "@material-ui/core/Divider/Divider";
import Drawer, {DrawerProps} from "@material-ui/core/Drawer/Drawer";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import withStyles, {StyleRules, WithStyles} from "@material-ui/core/styles/withStyles";

import NavLinkListItem from "./NavLinkListItem";

const styles: StyleRules<"header" | "loading" | "paper"> = {
	header: {},
	loading: {
		paddingTop: "8px",
		textAlign: "center",
	},
	paper: {},
};

interface NavDrawerProps extends DrawerProps {
	items: { id: string; title: string; length: number }[] | null;
	onNavLinkClicked: (e: React.MouseEvent<any>) => void;
}

const NavDrawer: React.FunctionComponent<NavDrawerProps & WithStyles<keyof typeof styles>> = (props) => {

	const onCollapseButtonClick = (e: React.MouseEvent<any>) => {
		if (props.onClose) {
			props.onClose(e, "backdropClick");
		}
	};

	const {
		items,
		children,
		onNavLinkClicked,
		classes,
		...rest
	} = props;

	const {
		header: headerClassName,
		loading: loadingClassName,
		...restClasses
	} = classes;

	const {search} = useLocation();
	const persistent = props.variant === "persistent";
	return (
		<Drawer classes={restClasses} {...rest}>
			<div>
				<div className={headerClassName}>
					{persistent && (
						<IconButton onClick={onCollapseButtonClick}>
							<ChevronLeftIcon />
						</IconButton>
					)}
				</div>
				<Divider />
				<List>
					<NavLinkListItem
						onClick={onNavLinkClicked}
						to={{pathname: "/", search}}
						exact>
						<ListItemText primary="ホーム" />
					</NavLinkListItem>
				</List>
				<Divider />
				{items
					? (
						<List>
							{items.map((item) => (
								item.length
									? (
										<NavLinkListItem
											onClick={onNavLinkClicked}
											to={{pathname: `/result/${item.id}`, search}}
											key={item.id}
										>
											<ListItemText
												primary={item.title}
												secondary={`${item.length} 件`}
											/>
										</NavLinkListItem>
									)
									: null
							))}
						</List>
					)
					: <div className={loadingClassName}><CircularProgress /></div>
				}
				<Divider />
				<List>
					<NavLinkListItem
						onClick={onNavLinkClicked}
						to={{pathname: "/settings", search}}
					>
						<ListItemText primary="設定" />
					</NavLinkListItem>
				</List>
			</div>
		</Drawer>
	);
};

export default withStyles(styles)(NavDrawer);
