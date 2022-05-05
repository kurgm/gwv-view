import * as React from "react";
import japaneseMessages from "@bicstone/ra-language-japanese";
import fakeDataProvider from "ra-data-fakerest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Admin, CustomRoutes, DataProvider, Resource, TranslationMessages } from "react-admin";
import { Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ConfigEdit from "./config/ConfigEdit";
import { dataProviderFactory } from "./dataProviderFactory";
import { fetchResultJson } from "./fetchResult";
import { resourcesFactory } from "./resourcesFactory";
import Layout from "./ui/Layout";
import { validateItems } from "./validateItems";

const i18nMesssages: Record<string, TranslationMessages> = {
	ja: {
		...japaneseMessages,
		resources: (() => {
			const resourceTranslations: Record<string, { name: string; }> = {};
			for (const { validatorName, errorCode, title } of validateItems) {
				resourceTranslations[`${validatorName}/${errorCode}`] = { name: title };
			}
			return resourceTranslations;
		})(),
	},
};

const i18nProvider = polyglotI18nProvider((locale) => i18nMesssages[locale], "ja");

const dataPromise = fetchResultJson();

const emptyDataProvider = fakeDataProvider({});

const loadResources = (() => {
	const resourcesPromise = (async () => {
		const data = await dataPromise;
		const resources = resourcesFactory(data);
		return <>
			{resources.map((props) => (
				<Resource key={props.name} {...props} />
			))}
			<CustomRoutes>
				<Route path="/config" element={<ConfigEdit />} />
			</CustomRoutes>
		</>;
	})();
	return () => resourcesPromise;
})();

const App = () => {
	const [dataProvider, setDataProvider] = React.useState<DataProvider>(emptyDataProvider);

	React.useEffect(() => {
		void dataPromise.then((data) => {
			setDataProvider(dataProviderFactory(data));
		});
	}, []);

	return (
		<Admin
			title="GlyphWiki dump 検証"
			dataProvider={dataProvider}
			i18nProvider={i18nProvider}
			dashboard={Dashboard}
			layout={Layout}
		>
			{loadResources}
		</Admin>
	);
};

export default App;
