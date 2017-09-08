import * as React from "react";

import * as PropTypes from "prop-types";

import { Location } from "history";
import { RouterChildContext } from "react-router-dom";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import ToolBar from "material-ui/ToolBar";
import Typography from "material-ui/Typography";

import { indigo } from "material-ui/colors";
import { createMuiTheme, MuiThemeProvider, withStyles } from "material-ui/styles";
// import withWidth, { IProps as WithWidthProps, LARGE, SMALL } from "material-ui/utils/withWidth";

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
const styles = {
	navDrawerContainer: {
		// paddingTop: muiTheme.appBar!.height!,
		paddingTop: 64, // TODO avoid magic number
	},
	root: {
		// paddingTop: theme.appBar!.height!,
		paddingTop: 64, // TODO avoid magic number
	},
};

class Master extends React.Component<IMasterProps & IClassesProps<typeof styles>/*& WithWidthProps*/, IMasterState> {

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
		const docked = false;
		// if (this.props.width === LARGE) {
		// 	navDrawerOpen = true;
		// 	docked = true;
		// 	styles.root.paddingLeft = styles.appBarTitle.paddingLeft = muiTheme.drawer!.width!;
		// 	styles.navDrawerContainer.borderRight = "1px solid rgba(0,0,0,.14)";
		// }

		const location: Location = this.context.router.route.location;
		return (
			<MuiThemeProvider theme={theme}>
				<div>
					<AppBar>
						<ToolBar>
							{!docked &&
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
						</ToolBar>
					</AppBar>
					<NavDrawer
						location={location}
						items={this.props.items}
						onListChange={this.handleNavDrawerListChange}
						type={docked ? "persistent" : "temporary"}
						onRequestClose={this.handleNavDrawerRequestClose}
						open={navDrawerOpen}
						containerClassName={this.props.classes.navDrawerContainer}
					/>
					<div className={this.props.classes.root}>
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

export default withStyles<IMasterProps>(styles)(Master);
