import * as React from "react";

import * as ReactMarkdown from "react-markdown";

import spacing from "material-ui/styles/spacing";

import * as HomeDoc from "./Home.md";

class Home extends React.Component<any, {}> {
	public render() {
		const styles = this.getStyles();
		return (
			<div style={styles.content}>
				<ReactMarkdown source={HomeDoc} />
			</div>
		);
	}

	private getStyles() {
		return {
			content: {
				margin: spacing.desktopGutter,
			} as React.CSSProperties,
		};
	}
}

export default Home;
