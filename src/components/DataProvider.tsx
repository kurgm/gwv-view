import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import searchData from "../searchData";
import validationItems from "../validationItems";

interface IDataProviderProps {
	view: (data: IJSONPCallback | null) => React.ReactNode;
}

interface ISearchResult {
	query: string;
	result: IJSONPCallback | null;
}

interface IDataProviderState {
	data: IJSONPCallback | null;
	search: ISearchResult | null;
}

class DataProvider extends React.Component<IDataProviderProps & RouteComponentProps<any>, IDataProviderState> {

	public state = {
		data: null,
		search: null,
	} as IDataProviderState;

	public componentDidMount() {
		window.gwvCallback = (data: IJSONPCallback) => {
			this.setState({ data });
			this.triggerSearch(data, this.props.location.search);
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

	public componentWillReceiveProps(nextProps: Readonly<IDataProviderProps & RouteComponentProps<any>>) {
		if (this.props.location.search !== nextProps.location.search) {
			this.triggerSearch(this.state.data, nextProps.location.search);
		}
	}

	public render() {
		const { data, search } = this.state;

		const dataToShow = search ? search.result : data;

		return this.props.view(dataToShow);
	}

	private triggerSearch(data: IJSONPCallback | null, queryString: string) {
		const params = new URLSearchParams(queryString);
		if (!params.has("search")) {
			this.setState({
				search: null,
			});
			return;
		}
		const query = params.get("search")!;
		this.setState({
			search: {
				query,
				result: data && searchData(data, query),
			},
		});
	}
}

export default withRouter(DataProvider);
