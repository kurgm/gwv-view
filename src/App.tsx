import * as React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import Master from "./components/Master";

import Home from "./components/Home";

import validationItems from "./validationItems";

class App extends React.Component<{}, { data: IJSONPCallback | null }> {

	public state = {
		data: null as IJSONPCallback | null,
	};

	public componentDidMount() {
		window.gwvCallback = (data: IJSONPCallback) => {
			this.setState({ data });
		};

		let names = validationItems.map((item) => item.id).join(",");
		for (const kv of location.search.slice(1).split("&")) {
			if (kv.substring(0, 5) === "name=") {
				names = kv.substring(5);
				break;
			}
		}

		const jsonUrl = "https://script.google.com/macros/s/AKfycbyZCl8KPrCHtzT8ywcE0tEgb7Yo8LfgldbkTz4O6eJ2i3v80pu-/exec";
		const s = document.createElement("script");
		s.setAttribute("type", "text/javascript");
		s.setAttribute("src", `${jsonUrl}?callback=gwvCallback&name=${names}`);
		document.getElementsByTagName("head")[0].appendChild(s);
	}
	public render() {
		return (
			<HashRouter>
				<Master items={this.state.data && validationItems.filter((item) => item.id in this.state.data!.result)}>
					<Switch>
						<Route exact path="/" component={Home} />
						{validationItems.map((ItemComponent) => (
							<Route path={`/result/${ItemComponent.id}`} component={() => (
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
