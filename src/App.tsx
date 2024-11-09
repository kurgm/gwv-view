import * as React from "react";
import japaneseMessages from "@bicstone/ra-language-japanese";
import fakeDataProvider from "ra-data-fakerest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import {
	Admin,
	AdminChildren,
	CustomRoutes,
	DataProvider,
	Resource,
	TranslationMessages,
} from "react-admin";
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
			const resourceTranslations: Record<string, { name: string }> = {};
			for (const { validatorName, errorCode, title } of validateItems) {
				resourceTranslations[`${validatorName}/${errorCode}`] = { name: title };
			}
			return resourceTranslations;
		})(),
	},
};

const i18nProvider = polyglotI18nProvider(
	(locale) => i18nMesssages[locale],
	"ja",
);

const dataPromise = fetchResultJson();

const emptyDataProvider = fakeDataProvider({});

const loadResources = (data: GWVJSON) => {
	const resources = resourcesFactory(data);
	return (
		<>
			{resources.map((props) => (
				<Resource key={props.name} {...props} />
			))}
			<CustomRoutes>
				<Route path="/config" element={<ConfigEdit />} />
			</CustomRoutes>
		</>
	);
};

const App = () => {
	const [dataProvider, setDataProvider] =
		React.useState<DataProvider>(emptyDataProvider);
	const [resources, setResources] = React.useState<React.ReactNode | undefined>(
		undefined,
	);

	React.useEffect(() => {
		void dataPromise.then((data) => {
			setDataProvider(dataProviderFactory(data));
			setResources(loadResources(data));
		});
	}, []);

	const adminChildren: AdminChildren =
		resources ??
		(() =>
			new Promise(() => {
				/* never resolves */
			}));

	return (
		<Admin
			title="GlyphWiki dump 検証"
			dataProvider={dataProvider}
			i18nProvider={i18nProvider}
			dashboard={Dashboard}
			layout={Layout}
		>
			{adminChildren}
		</Admin>
	);
};

export default App;
