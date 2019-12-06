import * as React from "react";

import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";

import indigo from "@material-ui/core/colors/indigo";
import {ThemeProvider} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

import MenuIcon from "@material-ui/icons/Menu";

import NavDrawer from "./NavDrawer";

interface MasterProps {
	items: { id: string; title: string; length: number }[] | null;
}

const theme = createMuiTheme({
	palette: {
		primary: indigo,
	},
});

const drawerWidth = 240;

const appBarHeight = 56;
const appBarHeightLarge = 64;
const appBarHeightSmall = 48;

const useStyles = makeStyles({
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
	},
	drawerPaper: {
		width: drawerWidth,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	root: {
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
});

const Master: React.FunctionComponent<MasterProps> = (props) => {
	const classes = useStyles();

	const persistent = useMediaQuery(theme.breakpoints.up("md"));

	const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);

	const handleLeftIconButtonClick = () => {
		setNavDrawerOpen(!navDrawerOpen);
	};
	const handleNavDrawerClose = (_e: any): void => {
		setNavDrawerOpen(false);
	};
	const handleNavLinkClick = (_e: any): void => {
		if (!persistent) {
			setNavDrawerOpen(false);
		}
	};

	const title = "GlyphWiki dump 検証";

	return (
		<ThemeProvider theme={theme}>
			<div>
				<AppBar
					className={`${classes.appBar} ${persistent && navDrawerOpen ? classes.appBarShift : ""}`}
				>
					<Toolbar>
						{!(persistent && navDrawerOpen) &&
							<IconButton
								onClick={handleLeftIconButtonClick}
								color="inherit"
								className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
						}
						<Typography variant="h6" color="inherit" noWrap>
							{title}
						</Typography>
					</Toolbar>
				</AppBar>
				<NavDrawer
					items={props.items}
					variant={persistent ? "persistent" : "temporary"}
					onClose={handleNavDrawerClose}
					onNavLinkClicked={handleNavLinkClick}
					open={navDrawerOpen}
					classes={{
						header: classes.drawerHeader,
						paper: classes.drawerPaper,
					}}
				/>
				<div
					className={`${classes.root} ${persistent && navDrawerOpen ? classes.rootShift : ""}`}
				>
					{props.children}
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Master;
