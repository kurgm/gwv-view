import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import Menu from "./Menu";
// import AppBar from "./AppBar";

const MyLayout: React.FC<LayoutProps> = (props) => (
	<Layout
		{...props}
		menu={Menu}
		// appBar={AppBar}
	/>
);

export default MyLayout;
