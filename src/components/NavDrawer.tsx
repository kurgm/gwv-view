import * as React from "react";

import { Location } from "history";

import Divider from "material-ui/Divider";
import Drawer, { DrawerProps } from "material-ui/Drawer";
import { ListItemText } from "material-ui/List";
import CircularProgress from "material-ui/Progress/CircularProgress";

import SelectableList, { SelectableListItem } from "./SelectableList";

interface INavDrawerProps extends DrawerProps {
	containerStyle?: React.CSSProperties;
	location: Location;
	items: Array<{ id: string; title: string; length: number; }> | null;
	onListChange: (e: React.MouseEvent<any>, value: any) => void;
}

class NavDrawer extends React.Component<INavDrawerProps, {}> {
	public render() {
		const {
			location,
			items,
			onListChange,
			children,
			containerStyle,
			...rest,
		} = this.props;
		return (
			<Drawer {...rest}>
				<div style={containerStyle}>
					<Divider />
					<SelectableList
						onChangeSelectable={onListChange}
						value={location.pathname}
					>
						<SelectableListItem selectValue="/">
							<ListItemText primary="ホーム" />
						</SelectableListItem>
					</SelectableList>
					<Divider />
					{items
						? (
							<SelectableList
								onChangeSelectable={onListChange}
								value={location.pathname}
							>
								{items.map((item) => (
									item.length
										? (
											<SelectableListItem
												selectValue={`/result/${item.id}`}
												key={item.id}
											>
												<ListItemText
													primary={item.title}
													secondary={`${item.length} 件`}
												/>
											</SelectableListItem>
										)
										: null
								))}
							</SelectableList>
						)
						: <div style={{ textAlign: "center", paddingTop: "8px" }}><CircularProgress /></div>
					}
					<Divider />
					<SelectableList
						onChangeSelectable={onListChange}
						value={location.pathname}
					>
						<SelectableListItem selectValue="/settings">
							<ListItemText primary="設定" />
						</SelectableListItem>
					</SelectableList>
				</div>
			</Drawer>
		);
	}
}

export default NavDrawer;
