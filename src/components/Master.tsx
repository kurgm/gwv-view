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
import withWidth, { IProps as WithWidthProps, LARGE, SMALL } from "material-ui/utils/withWidth";

import { IValidateResultComponent } from "../validationItems";
import NavDrawer from "./NavDrawer";

interface IMasterProps {
	items: IValidateResultComponent[] | null;
}

interface IMasterState {
	navDrawerOpen: boolean;
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigo500,
		primary2Color: indigo700,
	},
});

class Master extends React.Component<IMasterProps & WithWidthProps, IMasterState> {

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

		let { navDrawerOpen } = this.state;
		let docked = false;
		if (this.props.width === LARGE) {
			navDrawerOpen = true;
			docked = true;
			styles.root.paddingLeft = styles.appBarTitle.paddingLeft = muiTheme.drawer!.width!;
			styles.navDrawerContainer.borderRight = "1px solid rgba(0,0,0,.14)";
		}

		const location: Location = this.context.router.route.location;
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
						title={title}
						style={styles.appBar}
						showMenuIconButton={!docked}
						titleStyle={styles.appBarTitle}
						iconStyleLeft={styles.appBarIconLeft}
					/>
					<NavDrawer
						location={location}
						items={this.props.items}
						onListChange={this.handleNavDrawerListChange}
						docked={docked}
						onRequestChange={this.handleNavDrawerRequestChange}
						open={navDrawerOpen}
						containerStyle={styles.navDrawerContainer}
						zDepth={docked ? 0 : 2}
					/>
					<div style={styles.root}>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

	private getStyle() {
		if (this.props.width === SMALL) {
			muiTheme.appBar!.height = 56;
			muiTheme.appBar!.padding = 16;
		} else {
			muiTheme.appBar!.height = 64;
			muiTheme.appBar!.padding = 24;
		}
		return {
			appBar: {
				position: "fixed",
				top: 0,
			} as React.CSSProperties,
			appBarIconLeft: {
				marginLeft: -12,
			} as React.CSSProperties,
			appBarTitle: {
				fontSize: 20,
				paddingLeft: 12,
			} as React.CSSProperties,
			navDrawerContainer: {
				paddingTop: muiTheme.appBar!.height!,
			} as React.CSSProperties,
			root: {
				paddingTop: muiTheme.appBar!.height!,
			} as React.CSSProperties,
		};
	}
	private handleLeftIconButtonTouchTap = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
	private handleNavDrawerRequestChange = (opening: boolean, _reason: string): void => {
		this.setState({
			navDrawerOpen: opening,
		});
	}
	private handleNavDrawerListChange = (_e: TouchTapEvent, value: any): void => {
		this.context.router.history.push(value);
		this.setState({
			navDrawerOpen: false,
		});
	}
}

export default withWidth<IMasterProps>()(Master);
