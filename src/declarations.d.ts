declare module "*.md" {
	const _exports: React.FunctionComponent;
	export = _exports;
}

// override incorrect typing

declare module "@material-ui/core/ListItem/ListItem" {
	import * as React from "react";
	import { ExtendButtonBase } from "@material-ui/core/ButtonBase";
	import { OverridableComponent, OverrideProps } from "@material-ui/core/OverridableComponent";
	
	export interface ListItemTypeMap<P, D extends React.ElementType> {
		props: P & {
			alignItems?: "flex-start" | "center";
			autoFocus?: boolean;
			button?: boolean;
			component?: React.ReactType;
			ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
			ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
			dense?: boolean;
			disabled?: boolean;
			disableGutters?: boolean;
			divider?: boolean;
			focusVisibleClassName?: string;
			selected?: boolean;
		};
		defaultComponent: D;
		classKey: ListItemClassKey;
	}
	
	const ListItem: OverridableComponent<ListItemTypeMap<{ button?: false }, "li">> &
	ExtendButtonBase<ListItemTypeMap<{ button: true }, "div">>;
	
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
	
	export type ListItemProps<D extends React.ElementType = "li", P = {}> = OverrideProps<
	ListItemTypeMap<P, D>,
	D
	>;
	
	export default ListItem;

}

type KageLineData = [number, string];

interface GWVJSON {
	result: { [id: string]: { [type: string]: any[] } };
	lastModified: number;
}
