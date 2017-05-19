import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import App from "./App";

ReactDOM.render(
	<App />,
	document.getElementById("app"),
);
