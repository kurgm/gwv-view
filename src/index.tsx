import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactGA from "react-ga";

import App from "./App";

ReactGA.initialize(
	'UA-15725089-5',
	process.env.NODE_ENV === "production" ? {} : {
		testMode: true,
		// debug: true,
	}
);

ReactDOM.render(
	<App />,
	document.getElementById("app"),
);
