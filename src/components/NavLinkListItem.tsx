import * as React from "react";

import {NavLink, NavLinkProps} from "react-router-dom";

import {Omit} from "@material-ui/core";

import ListItem, {ListItemProps} from "@material-ui/core/ListItem/ListItem";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
	selectedItem: {
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.2)",
		},
		"backgroundColor": "rgba(0, 0, 0, 0.2)",
	},
});

export interface NavLinkListItemProps
	extends ListItemProps, Omit<NavLinkProps, keyof NavLinkProps & keyof ListItemProps> {
}

const NavLinkListItem: React.FunctionComponent<NavLinkListItemProps> = (props) => {
	const classes = useStyles();
	const {button, ...rest} = props;
	return (
		<ListItem
			button
			component={NavLink}
			{...rest}
			activeClassName={classes.selectedItem}
		/>
	);
};

export default NavLinkListItem;
