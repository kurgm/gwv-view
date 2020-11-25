import * as React from "react";
import { AppBar, AppBarProps } from "react-admin";

const MyAppBar: React.FC<AppBarProps> = (props) => <AppBar {...props} userMenu={false} />;

export default MyAppBar;
