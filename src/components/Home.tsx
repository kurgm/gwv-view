import * as React from "react";

import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import * as HomeDoc from "./Home.md";

const styles = {
	content: {
		// margin: spacing.desktopGutter,
		margin: 24, // TODO avoid magic number
	},
};

class Home extends React.Component<WithStyles<keyof typeof styles>, {}> {
	public render() {
		return (
			<div className={this.props.classes.content}>
				<HomeDoc />
			</div>
		);
	}
}

export default withStyles(styles)(Home);
