import * as React from "react";

import {RouteComponentProps, withRouter} from "react-router-dom";

import {Omit, StandardProps} from "@material-ui/core";
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

export type NavDrawerClassKey = keyof typeof styles;

interface NavDrawerProps extends
	Omit<StandardProps<DrawerProps, NavDrawerClassKey>, "classes"> {
	items: { id: string; title: string; length: number }[] | null;
	onNavLinkClicked: (e: React.MouseEvent<any>) => void;
}

class NavDrawer extends React.Component<
	NavDrawerProps & RouteComponentProps<any> & WithStyles<NavDrawerClassKey>, {}> {
	public render() {
		const {
			items,
			children,
			classes,
			onNavLinkClicked,
			match,
			location,
			history,
			staticContext,
			...rest
		} = this.props;
		const {
			header: headerClassName,
			loading: loadingClassName,
			...restClasses
		} = classes;
		const {search} = location;
		const persistent = this.props.variant === "persistent";
		return (
			<Drawer classes={restClasses} {...rest}>
				<div>
					<div className={headerClassName}>
						{persistent && (
							<IconButton onClick={this.props.onClose}>
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
	}
}

export default withRouter(withStyles(styles)(NavDrawer));
