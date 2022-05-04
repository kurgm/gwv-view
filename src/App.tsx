import * as React from "react";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, DataProvider, Resource, TranslationMessages } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import japaneseMessages from "@bicstone/ra-language-japanese";
import * as ReactGA from "react-ga";
import { createHashHistory } from "history";

import { dataProviderFactory } from "./dataProviderFactory";
import { fetchResultJson } from "./fetchResult";
import { resourcesFactory } from "./resourcesFactory";
import { validateItems } from "./validateItems";
import Dashboard from "./Dashboard";
import Layout from "./ui/Layout";
import ConfigEdit from "./config/ConfigEdit";

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

const history = createHashHistory();
history.listen(({ location: hLocation }) => {
	ReactGA.pageview(location.pathname + "#" + hLocation.pathname);
});

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
			history={history}
		>
			{loadResources}
		</Admin>
	);
};

export default App;
