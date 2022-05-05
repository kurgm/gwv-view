import fakeDataProvider from "ra-data-fakerest";
import { DataProvider, GetOneParams, GetOneResult, RaRecord, UpdateParams, UpdateResult } from "react-admin";

import { Config, getConfig, setConfig } from "./config";
import { validateItems } from "./validateItems";

export const dataProviderFactory = ({ result }: GWVJSON): DataProvider => {
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

	const resultDataProvider = fakeDataProvider(collectionMap);

	const dataProvider: DataProvider = {
		...resultDataProvider,
		getOne: async <RecordType extends RaRecord = RaRecord>(resource: string, params: GetOneParams<RecordType>): Promise<GetOneResult<RecordType>> => {
			if (resource !== "config") {
				return resultDataProvider.getOne(resource, params);
			}

			const config = getConfig();
			return {
				data: {
					id: params.id,
					...config,
				} as RaRecord as RecordType,
			};
		},
		update: async <RecordType extends RaRecord = RaRecord>(resource: string, params: UpdateParams<RecordType>): Promise<UpdateResult<RecordType>> => {
			if (resource !== "config") {
				return resultDataProvider.update(resource, params);
			}

			const { id, ...config } = params.data as RaRecord;
			setConfig(config as Config);

			return {
				data: params.data as RecordType,
			};
		},
	};

	return dataProvider;
};
