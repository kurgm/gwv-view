import * as React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import DefaultIcon from "@mui/icons-material/ViewList";
import Divider from "@mui/material/Divider";
import { Menu, MenuProps, ResourceProps, useResourceDefinitions } from "react-admin";
import { matchPath, useLocation } from "react-router";

import SubMenu from "./SubMenu";
import { validators } from "../validateItems";

const MyMenu: React.FC<MenuProps> = (props) => {
	const resourcesDefinitions = useResourceDefinitions();

	const resourcesByValidator = React.useMemo(() => {
		const resources = Object.keys(resourcesDefinitions).map(name => resourcesDefinitions[name]);

		const result: Record<string, ResourceProps[]> = {};
		for (const resource of resources) {
			const validatorName = resource.name.split("/")[0];
			if (!result[validatorName]) {
				result[validatorName] = [];
			}
			result[validatorName].push(resource);
		}
		return result;
	}, [resourcesDefinitions]);

	const [submenuOpenState, setSubmenuOpenState] = React.useState<Record<string, boolean>>({});
	const handleSubmenuToggle = React.useMemo(() => {
		const handlers: Record<string, () => void> = {};
		for (const validator of validators) {
			handlers[validator.name] = () => setSubmenuOpenState((openState) => ({
				...openState,
				[validator.name]: !openState[validator.name],
			}));
		}
		return handlers;
	}, []);

	const location = useLocation();

	return (
		<Menu {...props}>
			<Menu.DashboardItem dense={props.dense} />
			<Divider />
			{validators.filter((validator) => !!resourcesByValidator[validator.name]).map((validator) => (
				<SubMenu
					key={validator.name}
					open={!!submenuOpenState[validator.name]}
					handleToggle={handleSubmenuToggle[validator.name]}
					icon={<FolderIcon />}
					title={validator.title}
					selected={!!matchPath(`/${validator.name}/*`, location.pathname)}
					dense={props.dense}
				>
					{resourcesByValidator[validator.name].map((resource) => (
						<Menu.Item
							key={resource.name}
							to={`/${resource.name}`}
							primaryText={resource.options?.label || resource.name}
							leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
							selected={!!matchPath(`/${resource.name}`, location.pathname)}
							dense={props.dense}
						/>
					))}
				</SubMenu>
			))}
			<Divider />
			<Menu.Item
				to="/config"
				primaryText="設定"
				leftIcon={<SettingsIcon />}
				selected={!!matchPath("/config", location.pathname)}
				dense={props.dense}
			/>
		</Menu>
	);
};

export default MyMenu;
