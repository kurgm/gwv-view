import * as React from "react";

import { Location } from "history";

import { TouchTapEvent } from "material-ui";
import Drawer from "material-ui/Drawer";
import { List, ListItem, makeSelectable } from "material-ui/List";

const SelectableList = makeSelectable(List);

interface INavDrawerProps {
	docked: boolean;
	location: Location;
	onListChange: (e: TouchTapEvent, value: any) => void;
	onNavDrawerRequestChange: (opening: boolean, reason: string) => void;
	open: boolean;
	style?: object;
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
		} = this.props;
		return (
			<Drawer
				{...{style, docked, open}}
				onRequestChange={onNavDrawerRequestChange}
			>
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
