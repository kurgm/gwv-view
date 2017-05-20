import * as React from "react";

import { Location } from "history";

import { TouchTapEvent } from "material-ui";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import { List, ListItem, makeSelectable } from "material-ui/List";
import spacing from "material-ui/styles/spacing";

const SelectableList = makeSelectable(List);

interface INavDrawerProps {
	docked: boolean;
	location: Location;
	onListChange: (e: TouchTapEvent, value: any) => void;
	onNavDrawerRequestChange: (opening: boolean, reason: string) => void;
	open: boolean;
	style?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	zDepth?: number;
}

class NavDrawer extends React.Component<INavDrawerProps, {}> {
	public render() {
		const {
			location,
			docked,
			onNavDrawerRequestChange,
			onListChange,
			open,
			style,
			containerStyle,
			zDepth,
		} = this.props;
		return (
			<Drawer
				{...{style, docked, open, containerStyle, zDepth}}
				onRequestChange={onNavDrawerRequestChange}
			>
				<Divider/>
				<SelectableList
					onChange={onListChange}
					value={location.pathname}
				>
					<ListItem primaryText="ホーム" value="/" />
					{/* TODO: Generate list from validator list */}
				</SelectableList>
			</Drawer>
		);
	}
}

export default NavDrawer;
