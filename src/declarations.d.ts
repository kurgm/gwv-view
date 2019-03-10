declare module "*.md" {
	const _exports: React.StatelessComponent;
	export = _exports;
}

// override incorrect typing

declare module "@material-ui/core/ListItem/ListItem" {
	import * as React from 'react';
	import { StandardProps } from '@material-ui/core';
	import { ButtonBaseProps } from '@material-ui/core/ButtonBase/ButtonBase';

	export interface ListItemProps
		extends StandardProps<
		ButtonBaseProps & React.LiHTMLAttributes<HTMLElement>,
		ListItemClassKey,
		'component'
		> {
		alignItems?: 'flex-start' | 'center';
		button?: boolean;
		component?: React.ReactType;
		ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
		ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
		dense?: boolean;
		disabled?: boolean;
		disableGutters?: boolean;
		divider?: boolean;
		focusVisibleClassName?: string;
		selected?: boolean;
	}

	export type ListItemClassKey =
		| 'root'
		| 'container'
		| 'focusVisible'
		| 'default'
		| 'dense'
		| 'disabled'
		| 'divider'
		| 'gutters'
		| 'button'
		| 'secondaryAction'
		| 'selected';

	const ListItem: React.ComponentType<ListItemProps>;

	export default ListItem;

}

declare module "react-router-dom/BrowserRouter" {
	export { BrowserRouter as default, BrowserRouterProps } from "react-router-dom";
}
declare module "react-router-dom/HashRouter" {
	export { HashRouter as default, HashRouterProps } from "react-router-dom";
}
declare module "react-router-dom/Link" {
	export { Link as default, LinkProps } from "react-router-dom";
}
declare module "react-router-dom/MemoryRouter" {
	export { MemoryRouter as default } from "react-router-dom";
}
declare module "react-router-dom/NavLink" {
	export { NavLink as default, NavLinkProps } from "react-router-dom";
}
declare module "react-router-dom/Prompt" {
	export { Prompt as default } from "react-router-dom";
}
declare module "react-router-dom/Redirect" {
	export { Redirect as default, RedirectProps } from "react-router-dom";
}
declare module "react-router-dom/Route" {
	export { Route as default, RouteComponentProps, RouteProps } from "react-router-dom";
}
declare module "react-router-dom/Router" {
	export { Router as default, RouterChildContext } from "react-router-dom";
}
declare module "react-router-dom/StaticRouter" {
	export { StaticRouter as default } from "react-router-dom";
}
declare module "react-router-dom/Switch" {
	export { Switch as default } from "react-router-dom";
}
declare module "react-router-dom/matchPath" {
	export { matchPath as default } from "react-router-dom";
}
declare module "react-router-dom/withRouter" {
	export { withRouter as default, RouteComponentProps } from "react-router-dom";
}

type KageLineData = [number, string];

// tslint:disable-next-line:interface-name
interface Window {
	gwvCallback: (data: IJSONPCallback) => void;
}

interface IJSONPCallback {
	result: { [id: string]: { [type: string]: any[]; }; };
	lastModified: number;
}
