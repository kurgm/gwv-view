import * as React from "react";

import {NavLink, NavLinkProps} from "react-router-dom";

import {Omit} from "@material-ui/core";

import ListItem, {ListItemProps} from "@material-ui/core/ListItem/ListItem";

import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

const styles = {
	selectedItem: {
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.2)",
		},
		"backgroundColor": "rgba(0, 0, 0, 0.2)",
	},
};

export interface NavLinkListItemProps
	extends
	Omit<ListItemProps, "classes">,
	Omit<NavLinkProps, keyof NavLinkProps & keyof ListItemProps> {
}

class NavLinkListItem extends React.Component<NavLinkListItemProps & WithStyles<keyof typeof styles>> {
	public render() {
		const {classes, ...rest} = this.props;
		const {selectedItem, ...restClasses} = classes;
		const props = {...rest, activeClassName: selectedItem};
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
