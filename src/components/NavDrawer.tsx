import * as React from "react";

import withRouter, { RouteComponentProps } from "react-router-dom/withRouter";

import { StandardProps } from "material-ui";
import Divider from "material-ui/Divider";
import Drawer, { DrawerProps } from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import List from "material-ui/List/List";
import ListItemText from "material-ui/List/ListItemText";
import CircularProgress from "material-ui/Progress/CircularProgress";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import withStyles, { StyleRules, WithStyles } from "material-ui/styles/withStyles";

import NavLinkListItem from "./NavLinkListItem";

import { Omit } from "material-ui";

const styles: StyleRules<"header" | "loading" | "paper"> = {
	header: {},
	loading: {
		paddingTop: "8px",
		textAlign: "center",
	},
	paper: {},
};

export type NavDrawerClassKey = keyof typeof styles;

interface INavDrawerProps extends
	Omit<StandardProps<DrawerProps, NavDrawerClassKey>, "classes"> {
	items: Array<{ id: string; title: string; length: number; }> | null;
	onNavLinkClicked: (e: React.MouseEvent<any>) => void;
}

class NavDrawer extends React.Component<
	INavDrawerProps & RouteComponentProps<any> & WithStyles<NavDrawerClassKey>, {}> {
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
			...rest,
		} = this.props;
		const {
			header: headerClassName,
			loading: loadingClassName,
			...restClasses,
		} = classes;
		const { search } = location;
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
							to={{ pathname: "/", search }}
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
												to={{ pathname: `/result/${item.id}`, search }}
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
							to={{ pathname: "/settings", search }}
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
