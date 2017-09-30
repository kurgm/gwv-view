import * as React from "react";

import * as ReactMarkdown from "react-markdown";

import { StyledComponentProps } from "material-ui";
import withStyles from "material-ui/styles/withStyles";

// import spacing from "material-ui/styles/spacing";

import * as HomeDoc from "./Home.md";

const styles = {
	content: {
		// margin: spacing.desktopGutter,
		margin: 24, // TODO avoid magic number
	} as React.CSSProperties,
};

class Home extends React.Component<StyledComponentProps<keyof typeof styles>, {}> {
	public render() {
		return (
			<div className={this.props.classes!.content}>
				<ReactMarkdown source={HomeDoc} />
			</div>
		);
	}
}

export default withStyles(styles)(Home);
