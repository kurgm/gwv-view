import * as React from "react";

import {TouchTapEvent} from "material-ui";
import AppBar from "material-ui/AppBar";
import {
	indigo500,
	indigo700,
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import spacing from "material-ui/styles/spacing";

interface IMasterState {
	navDrawerOpen: boolean;
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigo500,
		primary2Color: indigo700,
	},
});

class Master extends React.Component<{}, IMasterState> {

	public state: Readonly<IMasterState> = {
		navDrawerOpen: false,
	};

	public render() {
		const title = "GlyphWiki dump 検証";
		const styles = this.getStyle();
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
						title={title}
						style={styles.appBar}
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
			root: {
				paddingTop: spacing.desktopKeylineIncrement,
			} as React.CSSProperties,
		};
	}
	private handleLeftIconButtonTouchTap() {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
}

export default Master;
