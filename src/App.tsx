import * as React from "react";
import { Admin, DataProvider, Resource, ResourceProps } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

import { dataProviderFactory } from "./dataProviderFactory";
import { fetchResultJson } from "./fetchResult";
import { resourcesFactory } from "./resourcesFactory";


const emptyDataProvider = fakeDataProvider({});

const App = () => {
	const [dataProvider, setDataProvider] = React.useState<DataProvider>(emptyDataProvider);
	const [resources, setResources] = React.useState<ResourceProps[]>([]);

	React.useEffect(() => {

		const fetchData = async () => {
			const data = await fetchResultJson();

			setDataProvider(dataProviderFactory(data));
			setResources(resourcesFactory(data));
		};

		void fetchData();
	}, []);

	return (
		<Admin
			title="GlyphWiki dump 検証"
			dataProvider={dataProvider}
		>
			{...resources.map((props) => (
				<Resource key={props.name} {...props} />
			))}
		</Admin>
	);
};

export default App;
