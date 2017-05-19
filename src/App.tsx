import * as React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import Master from "./components/Master";

import Home from "./components/Home";

const App = () => (
	<HashRouter>
		<Master>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</Master>
	</HashRouter>
);

export default App;
