import * as React from "react";
import * as ReactDOM from "react-dom";
import injectTapEventPlugin = require("react-tap-event-plugin");
import App from "./App";

injectTapEventPlugin();

ReactDOM.render(
	<App />,
	document.getElementById("app"),
);
