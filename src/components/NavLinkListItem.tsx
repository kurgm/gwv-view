import * as React from "react";

import { NavLink, NavLinkProps } from "react-router-dom";

import { Omit } from "material-ui";

import ListItem, { ListItemProps } from "material-ui/List/ListItem";

import withStyles, { WithStyles } from "material-ui/styles/withStyles";

const styles = {
	selectedItem: {
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.2)",
		} as React.CSSProperties,
		"backgroundColor": "rgba(0, 0, 0, 0.2)",
	} as React.CSSProperties,
};

export interface INavLinkListItemProps
	extends ListItemProps, Omit<NavLinkProps, keyof NavLinkProps & keyof ListItemProps> {
}

class NavLinkListItem extends React.Component<INavLinkListItemProps & WithStyles<keyof typeof styles>> {
	public render() {
		const { classes, ...rest } = this.props;
		const { selectedItem, ...restClasses } = classes;
		const props = { ...rest, activeClassName: selectedItem };
		return (
			<ListItem
				button
				component={NavLink}
				classes={restClasses}
				{...props}
			/>
		);
	}
}

export default withStyles(styles)(NavLinkListItem);
