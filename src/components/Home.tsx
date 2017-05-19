import * as React from "react";
import * as ReactMarkdown from "react-markdown";

import * as HomeDoc from "./Home.md";

class Home extends React.Component<undefined, {}> {
	public render() {
		return (
			<div>
				<ReactMarkdown source={HomeDoc} />
			</div>
		);
	}
}

export default Home;
