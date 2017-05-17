import * as React from "react";
import { render } from "react-dom";
import injectTapEventPlugin = require("react-tap-event-plugin");
import App from "./App";

injectTapEventPlugin();

render(
	<App />,
	document.getElementById("app"),
);
