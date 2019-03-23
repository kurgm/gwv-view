import * as React from "react";

import {RouteComponentProps, withRouter} from "react-router-dom";

import searchData from "../searchData";

interface DataProviderProps {
	view: (data: GWVJSON | null) => React.ReactNode;
}

interface SearchResult {
	query: string;
	result: GWVJSON | null;
}

interface DataProviderState {
	data: GWVJSON | null;
	search: SearchResult | null;
}

class DataProvider extends React.Component<DataProviderProps & RouteComponentProps<any>, DataProviderState> {

	public state: Readonly<DataProviderState> = {
		data: null,
		search: null,
	};

	public componentDidMount() {
		const xhr = new XMLHttpRequest();
		const jsonUrl = "https://gist.githubusercontent.com/kurgm/cef8cd1cc8de3484739839816a165e20/raw/gwv_result.json";
		xhr.open("GET", jsonUrl);
		xhr.addEventListener("load", () => {
			if (xhr.readyState !== 4 || xhr.status !== 200) {
				return;
			}
			this.setState({
				data: JSON.parse(xhr.responseText) as GWVJSON,
			});
		});
		xhr.send();
	}

	public componentWillReceiveProps(nextProps: Readonly<DataProviderProps & RouteComponentProps<any>>) {
		if (this.props.location.search !== nextProps.location.search) {
			this.triggerSearch(this.state.data, nextProps.location.search);
		}
	}

	public render() {
		const {data, search} = this.state;

		const dataToShow = search ? search.result : data;

		return this.props.view(dataToShow);
	}

	private triggerSearch(data: GWVJSON | null, queryString: string) {
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
