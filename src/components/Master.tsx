import * as React from "react";

import {TouchTapEvent} from "material-ui";
import AppBar from "material-ui/AppBar";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

interface IMasterState {
	navDrawerOpen: boolean;
}

class Master extends React.Component<{}, IMasterState> {

	public state: Readonly<IMasterState> = {
		navDrawerOpen: false,
	};

	public render() {
		const title = "GlyphWiki dump 検証";
		const styles = this.getStyle();
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					{
						<AppBar
							onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
							title={title}
							style={styles.appBar}
							/>
					}
					{this.props.children}
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
		};
	}
	private handleLeftIconButtonTouchTap() {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen,
		});
	}
}

export default Master;
