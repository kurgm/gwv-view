import * as React from "react";

import { Location } from "history";

import { TouchTapEvent } from "material-ui";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import { List, ListItem, makeSelectable } from "material-ui/List";

const SelectableList = makeSelectable(List);

interface INavDrawerProps extends __MaterialUI.DrawerProps {
	location: Location;
	items: Array<{ id: string; title: string; length: number; }> | null;
	onListChange: (e: TouchTapEvent, value: any) => void;
}

class NavDrawer extends React.Component<INavDrawerProps, {}> {
	public render() {
		const {
			location,
			items,
			onListChange,
			children,
			...rest,
		} = this.props;
		return (
			<Drawer {...rest}>
				<Divider />
				<SelectableList
					onChange={onListChange}
					value={location.pathname}
				>
					<ListItem primaryText="ホーム" value="/" />
				</SelectableList>
				<Divider />
				{items
					? (
						<SelectableList
							onChange={onListChange}
							value={location.pathname}
						>
							{items.map((item) => (
								item.length
									? (
										<ListItem
											primaryText={item.title}
											secondaryText={`${item.length} 件`}
											value={`/result/${item.id}`}
											key={item.id}
										/>
									)
									: null
							))}
						</SelectableList>
					)
					: <div style={{ textAlign: "center", paddingTop: "8px" }}><CircularProgress /></div>
				}
			</Drawer>
		);
	}
}

export default NavDrawer;
