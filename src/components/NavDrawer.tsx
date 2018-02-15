import * as React from "react";

import { Location } from "history";

import { StandardProps } from "material-ui";
import Divider from "material-ui/Divider";
import Drawer, { DrawerProps } from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import ListItemText from "material-ui/List/ListItemText";
import CircularProgress from "material-ui/Progress/CircularProgress";

import ChevronLeftIcon from "material-ui-icons/ChevronLeft";

import withStyles, { WithStyles } from "material-ui/styles/withStyles";

import SelectableList, { SelectableListItem } from "./SelectableList";

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
	location: Location;
	items: Array<{ id: string; title: string; length: number; }> | null;
	onListChange: (e: React.MouseEvent<any>, value: any) => void;
}

class NavDrawer extends React.Component<
	INavDrawerProps & WithStyles<NavDrawerClassKey>, {}> {
	public render() {
		const {
			location,
			items,
			onListChange,
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
					<SelectableList
						onChangeSelectable={onListChange}
						value={location.pathname}
					>
						<SelectableListItem selectValue="/">
							<ListItemText primary="ホーム" />
						</SelectableListItem>
					</SelectableList>
					<Divider />
					{items
						? (
							<SelectableList
								onChangeSelectable={onListChange}
								value={location.pathname}
							>
								{items.map((item) => (
									item.length
										? (
											<SelectableListItem
												selectValue={`/result/${item.id}`}
												key={item.id}
											>
												<ListItemText
													primary={item.title}
													secondary={`${item.length} 件`}
												/>
											</SelectableListItem>
										)
										: null
								))}
							</SelectableList>
						)
						: <div className={loadingClassName}><CircularProgress /></div>
					}
					<Divider />
					<SelectableList
						onChangeSelectable={onListChange}
						value={location.pathname}
					>
						<SelectableListItem selectValue="/settings">
							<ListItemText primary="設定" />
						</SelectableListItem>
					</SelectableList>
				</div>
			</Drawer>
		);
	}
}

export default withStyles(styles)(NavDrawer);
