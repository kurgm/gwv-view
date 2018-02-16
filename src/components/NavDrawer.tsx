import * as React from "react";

import { StandardProps } from "material-ui";
import Divider from "material-ui/Divider";
import Drawer, { DrawerProps } from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import List from "material-ui/List/List";
import ListItemText from "material-ui/List/ListItemText";
import CircularProgress from "material-ui/Progress/CircularProgress";

import ChevronLeftIcon from "material-ui-icons/ChevronLeft";

import withStyles, { WithStyles } from "material-ui/styles/withStyles";

import NavLinkListItem from "./NavLinkListItem";

const styles = {
	header: {},
	loading: {
		paddingTop: "8px",
		textAlign: "center",
	},
	paper: {},
};

export type NavDrawerClassKey = keyof typeof styles;

interface INavDrawerProps extends StandardProps<DrawerProps, NavDrawerClassKey> {
	items: Array<{ id: string; title: string; length: number; }> | null;
}

class NavDrawer extends React.Component<
	INavDrawerProps & WithStyles<NavDrawerClassKey>, {}> {
	public render() {
		const {
			items,
			children,
			classes,
			...rest,
		} = this.props;
		const {
			header: headerClassName,
			loading: loadingClassName,
			...restClasses,
		} = classes;
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
						<NavLinkListItem to="/" exact>
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
												to={`/result/${item.id}`}
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
						<NavLinkListItem to="/settings">
							<ListItemText primary="設定" />
						</NavLinkListItem>
					</List>
				</div>
			</Drawer>
		);
	}
}

export default withStyles(styles)(NavDrawer);
