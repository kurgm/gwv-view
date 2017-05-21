import * as React from "react";

import { Location } from "history";

import { TouchTapEvent } from "material-ui";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import { List, ListItem, makeSelectable } from "material-ui/List";
import spacing from "material-ui/styles/spacing";

const SelectableList = makeSelectable(List);

interface INavDrawerProps extends __MaterialUI.DrawerProps {
	location: Location;
	onListChange: (e: TouchTapEvent, value: any) => void;
}

class NavDrawer extends React.Component<INavDrawerProps, {}> {
	public render() {
		const {
			location,
			onListChange,
			children,
			...rest,
		} = this.props;
		return (
			<Drawer
				{...rest}
			>
				<Divider />
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
