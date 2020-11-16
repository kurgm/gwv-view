import * as React from "react";
import { useSelector } from "react-redux";
import { MenuItemLink, getResources, MenuProps, ResourceProps, DashboardMenuItem } from "react-admin";
import Divider from "@material-ui/core/Divider";
import DefaultIcon from "@material-ui/icons/ViewList";

import SubMenu from "./SubMenu";
import { validators } from "./validateItems";

const Menu: React.FC<MenuProps> = ({ onMenuClick }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
	const open = useSelector((state) => (state as any).admin.ui.sidebarOpen as boolean);
	const resources = useSelector(getResources) as ResourceProps[];

	const resourcesByValidator: Record<string, ResourceProps[]> = {};
	for (const resource of resources) {
		const validatorName = resource.name.split("/")[0];
		if (!resourcesByValidator[validatorName]) {
			resourcesByValidator[validatorName] = [];
		}
		resourcesByValidator[validatorName].push(resource);
	}

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

	return (
		<div>
			<DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
			<Divider />
			{validators.filter((validator) => !!resourcesByValidator[validator.name]).map((validator) => (
				<SubMenu
					open={!!submenuOpenState[validator.name]}
					handleToggle={handleSubmenuToggle[validator.name]}
					icon={<DefaultIcon />}
					title={validator.title}
					sidebarIsOpen={open}
				>
					{resourcesByValidator[validator.name].map((resource) => (
						<MenuItemLink
							key={resource.name}
							to={`/${resource.name}`}
							primaryText={
								((resource.options as { label?: string; })?.label) ||
								resource.name}
							leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
							onClick={onMenuClick}
							sidebarIsOpen={open}
						/>
					))}
				</SubMenu>
			))}
		</div>
	);
};

export default Menu;
