import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, DataProvider, Resource, TranslationMessages } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import japaneseMessages from "@bicstone/ra-language-japanese";

import { dataProviderFactory } from "./dataProviderFactory";
import { fetchResultJson } from "./fetchResult";
import { resourcesFactory } from "./resourcesFactory";
import { validateItems } from "./validateItems";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import ConfigEdit from "./ConfigEdit";

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

const loadResources = async () => {
	const data = await dataPromise;
	const resources = resourcesFactory(data);
	return resources.map((props) => (
		<Resource key={props.name} {...props} />
	));
};

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
			customRoutes={[
				<Route key="config" exact path="/config" component={ConfigEdit} />,
			]}
		>
			{loadResources}
		</Admin>
	);
};

export default App;
