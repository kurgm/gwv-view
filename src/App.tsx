import * as React from "react";
import { Admin, DataProvider, Resource, ResourceProps, TranslationMessages } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import japaneseMessages from '@bicstone/ra-language-japanese';

import { dataProviderFactory } from "./dataProviderFactory";
import { fetchResultJson } from "./fetchResult";
import { resourcesFactory } from "./resourcesFactory";
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
			i18nProvider={i18nProvider}
		>
			{...resources.map((props) => (
				<Resource key={props.name} {...props} />
			))}
		</Admin>
	);
};

export default App;
