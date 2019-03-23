import * as React from "react";

import {HashRouter, Route, Switch} from "react-router-dom";

import DataProvider from "./components/DataProvider";
import Home from "./components/Home";
import Master from "./components/Master";
import Settings from "./components/Settings";

import validationItems from "./validationItems";

class App extends React.Component<{}> {

	public render() {
		return (
			<HashRouter>
				<DataProvider
					view={(dataToShow) => <Master
						items={dataToShow &&
								validationItems
									.filter((item) => item.id in dataToShow.result)
									.map((item) => ({
										id: item.id,
										length: Object.keys(dataToShow.result[item.id])
											.reduce((prev, key) => prev + dataToShow.result[item.id][key].length, 0),
										title: item.title,
									}))
						}
					>
						<Switch>
							<Route exact path="/" component={Home} />
							{validationItems.map((ItemComponent) => (
								<Route path={`/result/${ItemComponent.id}`} component={() => (
									<ItemComponent result={dataToShow && (dataToShow.result[ItemComponent.id] || {})} />
								)} key={ItemComponent.id} />
							))}
							<Route path="/settings" component={Settings} />
						</Switch>
					</Master>
					}
				/>
			</HashRouter>
		);
	}
}

export default App;
