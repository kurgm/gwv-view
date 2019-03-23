declare module "*.md" {
	const _exports: React.StatelessComponent;
	export = _exports;
}

// override incorrect typing

declare module "@material-ui/core/ListItem/ListItem" {
	import * as React from "react";
	import {ButtonBaseProps} from "@material-ui/core/ButtonBase/ButtonBase";
	import {StandardProps} from "@material-ui/core";

	export interface ListItemProps
		extends StandardProps<
		ButtonBaseProps & React.LiHTMLAttributes<HTMLElement>,
		ListItemClassKey,
		"component"
		> {
		alignItems?: "flex-start" | "center";
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
		| "root"
		| "container"
		| "focusVisible"
		| "default"
		| "dense"
		| "disabled"
		| "divider"
		| "gutters"
		| "button"
		| "secondaryAction"
		| "selected";

	const ListItem: React.ComponentType<ListItemProps>;

	export default ListItem;

}

type KageLineData = [number, string];

interface GWVJSON {
	result: { [id: string]: { [type: string]: any[] } };
	lastModified: number;
}
