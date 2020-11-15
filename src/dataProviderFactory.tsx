import fakeDataProvider from 'ra-data-fakerest';

import { validateItems } from './validateItems';

export const dataProviderFactory = ({ result }: GWVJSON) => {
	const collectionMap: Record<string, unknown[]> = {};

	for (const { validatorName, errorCode, entryType } of validateItems) {
		const entries = result[validatorName]?.[errorCode];
		if (!entries) {
			continue;
		}

		let adaptedEntries;
		switch (entryType.type) {
			case "tabular":
				adaptedEntries = entries;
				break;
			case "headtail":
				adaptedEntries = (entries as unknown[][]).map((entry) => ({
					head: entry[0],
					tail: entry.slice(1),
				}));
				break;
			case "mustrenew":
				adaptedEntries = (entries as string[][]).map((entry) => ({
					quoted: entry[0],
					quoteCount: entry.length - 1,
				}));
				break;
		}

		collectionMap[`${validatorName}/${errorCode}`] = adaptedEntries;
	}

	return fakeDataProvider(collectionMap);
};
