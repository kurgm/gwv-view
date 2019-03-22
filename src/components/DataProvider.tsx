import * as React from "react";

import withRouter, { RouteComponentProps } from "react-router-dom/withRouter";

import searchData from "../searchData";

interface IDataProviderProps {
	view: (data: IGWVJSON | null) => React.ReactNode;
}

interface ISearchResult {
	query: string;
	result: IGWVJSON | null;
}

interface IDataProviderState {
	data: IGWVJSON | null;
	search: ISearchResult | null;
}

class DataProvider extends React.Component<IDataProviderProps & RouteComponentProps<any>, IDataProviderState> {

	public state = {
		data: null,
		search: null,
	} as IDataProviderState;

	public componentDidMount() {
		const xhr = new XMLHttpRequest();
		const jsonUrl = "https://gist.githubusercontent.com/kurgm/cef8cd1cc8de3484739839816a165e20/raw/gwv_result.json";
		xhr.open("GET", jsonUrl);
		xhr.addEventListener("load", () => {
			if (xhr.readyState !== 4 || xhr.status !== 200) {
				return;
			}
			this.setState({
				data: JSON.parse(xhr.responseText) as IGWVJSON,
			});
		});
		xhr.send();
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

	private triggerSearch(data: IGWVJSON | null, queryString: string) {
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
