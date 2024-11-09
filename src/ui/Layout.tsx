import * as React from "react";
import { Layout, LayoutProps } from "react-admin";

import Menu from "./Menu";

const MyLayout: React.FC<LayoutProps> = (props) => (
	<Layout {...props} menu={Menu} />
);

export default MyLayout;
