import * as React from "react";

import * as PropTypes from "prop-types";

import { Location } from "history";
import { RouterChildContext } from "react-router-dom";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import { indigo } from "material-ui/colors";
import { createMuiTheme, MuiThemeProvider, withStyles } from "material-ui/styles";
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
	} as React.CSSProperties,
	drawerPaper: {
		width: drawerWidth,
	},
	navDrawerContainer: {
		// paddingTop: muiTheme.appBar!.height!,
		paddingTop: 64, // TODO avoid magic number
	},
	root: {
		// paddingTop: theme.appBar!.height!,
		paddingTop: 64, // TODO avoid magic number
		transition: theme.transitions.create("margin", {
			duration: theme.transitions.duration.leavingScreen,
			easing: theme.transitions.easing.sharp,
		}),
	},
	rootShift: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create("margin", {
			duration: theme.transitions.duration.enteringScreen,
			easing: theme.transitions.easing.easeOut,
		}),
	},
};

class Master extends React.Component<IMasterProps & IClassesProps<typeof styles> & WithWidthProps, IMasterState> {

	public static contextTypes = {
		router: PropTypes.object,
	};
	public context: RouterChildContext<any>;

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
						className={`${this.props.classes.appBar} ${persistent && navDrawerOpen ? this.props.classes.appBarShift : ""}`}
					>
						<Toolbar>
							{!persistent &&
								<IconButton
									onClick={this.handleLeftIconButtonTouchTap}
									color="contrast"
								>
									<MenuIcon />
								</IconButton>
							}
							<Typography type="title" color="inherit">
								{title}
							</Typography>
						</Toolbar>
					</AppBar>
					<NavDrawer
						location={location}
						items={this.props.items}
						onListChange={this.handleNavDrawerListChange}
						type={persistent ? "persistent" : "temporary"}
						onRequestClose={this.handleNavDrawerRequestClose}
						open={navDrawerOpen}
						containerClassName={this.props.classes.navDrawerContainer}
						classes={{
							paper: this.props.classes.drawerPaper,
						}}
					/>
					<div
						className={`${this.props.classes.root} ${persistent && navDrawerOpen ? this.props.classes.rootShift : ""}`}
					>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

	private handleLeftIconButtonTouchTap = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
	private handleNavDrawerRequestClose = (_e: any): void => {
		this.setState({
			navDrawerOpen: false,
		});
	}
	private handleNavDrawerListChange = (_e: any, value: any): void => {
		this.context.router.history.push(value);
		this.setState({
			navDrawerOpen: false,
		});
	}
}

export default withWidth<IMasterProps>()(withStyles(styles)(Master));
