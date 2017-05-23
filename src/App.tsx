import * as React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import Master from "./components/Master";

import Home from "./components/Home";

import validationItems from "./validationItems";

import CornerComponent from "./components/val-items/corner";

class App extends React.Component<{}, { data: IJSONPCallback | null }> {

	public state = {
		data: null as IJSONPCallback | null,
	};

	public componentDidMount() {
		window.gwvCallback = (data: IJSONPCallback) => {
			this.setState({ data });
		};
		const jsonUrl = "https://script.google.com/macros/s/AKfycbyZCl8KPrCHtzT8ywcE0tEgb7Yo8LfgldbkTz4O6eJ2i3v80pu-/exec";
		const names = validationItems.map((item) => item.id);
		const s = document.createElement("script");
		s.setAttribute("type", "text/javascript");
		s.setAttribute("src", `${jsonUrl}?callback=gwvCallback&name=${names.join(",")}`);
		document.getElementsByTagName("head")[0].appendChild(s);
	}
	public render() {
		return (
			<HashRouter>
				<Master>
					<Switch>
						<Route exact path="/" component={Home} />
						{validationItems.map((ItemComponent) => (
							<Route path={`/${ItemComponent.id}`} component={(props) => (
								<ItemComponent result={this.state.data && this.state.data.result[ItemComponent.id]} />
							)} key={ItemComponent.id} />
						))}
					</Switch>
				</Master>
			</HashRouter>
		);
	}
}

export default App;
