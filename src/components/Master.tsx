import * as React from "react";

import * as PropTypes from "prop-types";

import { Location } from "history";
import { RouterChildContext } from "react-router-dom";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import indigo from "material-ui/colors/indigo";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import withStyles, { WithStyles } from "material-ui/styles/withStyles";
import withWidth, { isWidthUp, WithWidthProps } from "material-ui/utils/withWidth";

import MenuIcon from "material-ui-icons/Menu";

import NavDrawer from "./NavDrawer";

interface IMasterProps {
	items: Array<{ id: string; title: string; length: number; }> | null;
}

interface IMasterState {
	navDrawerOpen: boolean;
}

const theme = createMuiTheme({
	palette: {
		primary: indigo,
	},
});

// if (this.props.width === SMALL) {
// 	muiTheme.appBar!.height = 56;
// 	muiTheme.appBar!.padding = 16;
// } else {
// 	muiTheme.appBar!.height = 64;
// 	muiTheme.appBar!.padding = 24;
// }
const drawerWidth = 240;

const appBarHeight = 56;
const appBarHeightLarge = 64;
const appBarHeightSmall = 48;

const styles = {
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			duration: theme.transitions.duration.leavingScreen,
			easing: theme.transitions.easing.sharp,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			duration: theme.transitions.duration.enteringScreen,
			easing: theme.transitions.easing.easeOut,
		}),
		width: `calc(100% - ${drawerWidth}px)`,
	},
	drawerHeader: {
		alignItems: "center",
		display: "flex",
		justifyContent: "flex-end",
		minHeight: appBarHeight,
		padding: "0 8px",
		[`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
			minHeight: appBarHeightSmall,
		},
		[theme.breakpoints.up("sm")]: {
			minHeight: appBarHeightLarge,
		},
	} as React.CSSProperties,
	drawerPaper: {
		width: drawerWidth,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	} as React.CSSProperties,
	root: {
		// paddingTop: theme.appBar!.height!,
		paddingTop: appBarHeight,
		transition: theme.transitions.create("margin", {
			duration: theme.transitions.duration.leavingScreen,
			easing: theme.transitions.easing.sharp,
		}),
		[`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
			paddingTop: appBarHeightSmall,
		},
		[theme.breakpoints.up("sm")]: {
			paddingTop: appBarHeightLarge,
		},
	},
	rootShift: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create("margin", {
			duration: theme.transitions.duration.enteringScreen,
			easing: theme.transitions.easing.easeOut,
		}),
	},
};

class Master extends React.Component<
	IMasterProps & WithStyles<keyof typeof styles> & WithWidthProps, IMasterState> {

	public static contextTypes = {
		router: PropTypes.object,
	};
	public context!: RouterChildContext<any>;

	public state: Readonly<IMasterState> = {
		navDrawerOpen: false,
	};

	public render() {
		const title = "GlyphWiki dump 検証";

		const { navDrawerOpen } = this.state;
		let persistent = false;
		if (isWidthUp("md", this.props.width)) {
			persistent = true;
		}

		const location: Location = this.context.router.route.location;
		return (
			<MuiThemeProvider theme={theme}>
				<div>
					<AppBar
						className={`${this.props.classes!.appBar} ${persistent && navDrawerOpen ? this.props.classes!.appBarShift : ""}`}
					>
						<Toolbar>
							{!(persistent && navDrawerOpen) &&
								<IconButton
									onClick={this.handleLeftIconButtonClick}
									color="inherit"
									className={this.props.classes!.menuButton}
								>
									<MenuIcon />
								</IconButton>
							}
							<Typography variant="title" color="inherit" noWrap>
								{title}
							</Typography>
						</Toolbar>
					</AppBar>
					<NavDrawer
						location={location}
						items={this.props.items}
						onListChange={this.handleNavDrawerListChange}
						variant={persistent ? "persistent" : "temporary"}
						onClose={this.handleNavDrawerClose}
						open={navDrawerOpen}
						classes={{
							header: this.props.classes!.drawerHeader,
							paper: this.props.classes!.drawerPaper,
						}}
					/>
					<div
						className={`${this.props.classes!.root} ${persistent && navDrawerOpen ? this.props.classes!.rootShift : ""}`}
					>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

	private handleLeftIconButtonClick = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
	private handleNavDrawerClose = (_e: any): void => {
		this.setState({
			navDrawerOpen: false,
		});
	}
	private handleNavDrawerListChange = (_e: any, value: any): void => {
		this.context.router.history.push(value);
		if (!isWidthUp("md", this.props.width)) {
			this.setState({
				navDrawerOpen: false,
			});
		}
	}
}

export default withWidth()<IMasterProps>(withStyles(styles)(Master));
