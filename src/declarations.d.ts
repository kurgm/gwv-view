declare module "*.md" {
	const _exports: React.StatelessComponent;
	export = _exports;
}

// override incorrect typing

declare module "material-ui/List/ListItem" {
	import * as React from 'react';
	import { StandardProps } from 'material-ui';
	import { ButtonBaseProps, ButtonBaseClassKey } from 'material-ui/ButtonBase';

	export interface ListItemProps
		extends StandardProps<
		ButtonBaseProps & React.LiHTMLAttributes<HTMLElement>,
		ListItemClassKey,
		'component'
		> {
		button?: boolean;
		component?: React.ReactType;
		dense?: boolean;
		disabled?: boolean;
		disableGutters?: boolean;
		divider?: boolean;
	}

	export type ListItemClassKey =
		| ButtonBaseClassKey
		| 'container'
		| 'keyboardFocused'
		| 'default'
		| 'dense'
		| 'divider'
		| 'gutters'
		| 'button'
		| 'secondaryAction';

	const ListItem: React.ComponentType<ListItemProps>;

	export default ListItem;

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
