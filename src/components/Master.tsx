import * as React from "react";

import * as PropTypes from "prop-types";

import { Location } from "history";
import { RouterChildContext } from "react-router-dom";

import { TouchTapEvent } from "material-ui";
import AppBar from "material-ui/AppBar";
import {
	indigo500,
	indigo700,
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import spacing from "material-ui/styles/spacing";
import withWidth, { LARGE, MEDIUM, Options } from "material-ui/utils/withWidth";

import NavDrawer from "./NavDrawer";

interface IMasterState {
	navDrawerOpen: boolean;
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigo500,
		primary2Color: indigo700,
	},
});

class Master extends React.Component<{
	width: number,
}, IMasterState> {

	public static contextTypes = {
		router: PropTypes.object,
	};
	public context: RouterChildContext<any>;

	public state: Readonly<IMasterState> = {
		navDrawerOpen: false,
	};

	public render() {
		const title = "GlyphWiki dump 検証";
		const styles = this.getStyle();

		const { navDrawerOpen } = this.state;
		const docked = false;

		const location: Location = this.context.router.route.location;
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
						title={title}
						style={styles.appBar}
					/>
					<NavDrawer
						docked={docked}
						location={location}
						onListChange={this.handleNavDrawerListChange}
						onNavDrawerRequestChange={this.handleNavDrawerRequestChange}
						open={navDrawerOpen}
						containerStyle={styles.navDrawerContainer}
					/>
					<div style={styles.root}>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

	private getStyle() {
		return {
			appBar: {
				position: "fixed",
				top: 0,
			} as React.CSSProperties,
			navDrawerContainer: {
				paddingTop: spacing.desktopKeylineIncrement,
			} as React.CSSProperties,
			root: {
				paddingTop: spacing.desktopKeylineIncrement,
			} as React.CSSProperties,
		};
	}
	private handleLeftIconButtonTouchTap = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
	private handleNavDrawerRequestChange = (opening: boolean, reason: string): void => {
		this.setState({
			navDrawerOpen: opening,
		});
	}
	private handleNavDrawerListChange = (e: TouchTapEvent, value: any): void => {
		this.context.router.history.push(value);
		this.setState({
			navDrawerOpen: false,
		});
	}
}

export default withWidth()(Master);
