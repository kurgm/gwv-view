import * as React from "react";
import { Datagrid, FunctionField, List, ListProps, NumberField, ResourceProps, TextField, TextFieldProps } from "react-admin";

import GlyphField from "./components/GlyphField";
import GlyphLink from "./components/GlyphLink";
import GlyphsField from "./components/GlyphsField";
import KageLineField from "./components/KageLineField";
import { TabularCellType, ValidateItemEntryType, validateItems } from "./validateItems";

interface FieldRendererProps extends TextFieldProps {
	columnType: TabularCellType;
}

const FieldRenderer = ({ columnType, ...restProps }: FieldRendererProps) => {
	if (typeof columnType === "object") {
		switch (columnType.type) {
			case "number":
				return (
					<NumberField options={columnType.options} {...restProps} />
				);
		}
	} else {
		switch (columnType) {
			case "glyphname":
				return (
					<GlyphField {...restProps} />
				);
			case "glyphnames":
				return (
					<GlyphsField {...restProps} />
				);
			case "kageline":
				return (
					<KageLineField {...restProps} />
				);
			case "quotedpart":
				return (
					<FunctionField
						render={(record?: Record<string, unknown>, source?: string) => {
							if (!(record && source)) {
								return null;
							}
							const [, kagedata] = record[source] as [string, string];
							const part = kagedata.split(":")[7];
							return <GlyphLink name={part} />;
						}}
						sortable={false}
						{...restProps}
					/>
				);
			case "text":
				return (
					<TextField {...restProps} />
				);
			case "number":
				return (
					<NumberField {...restProps} />
				);
			case "ignore":
				return null;
		}
	}
};


interface EntryRendererProps {
	entryType: ValidateItemEntryType;
}

const EntryRenderer = ({ entryType }: EntryRendererProps) => {
	switch (entryType.type) {
		case "tabular":
			return (
				<Datagrid>
					{...entryType.columns.map((column, index) => (
						column.type === "ignore"
							? null
							: <FieldRenderer
								key={index}
								source={`${index}`}
								columnType={column.type}
								label={column.label}
							/>
					)).filter((elem) => !!elem)}
				</Datagrid>
			);
		case "headtail":
			return (
				<Datagrid>
					<FieldRenderer
						source="head"
						columnType={entryType.headType}
						label={entryType.headLabel}
					/>
					<GlyphsField
						source="tail"
						label={entryType.tailLabel}
					/>
				</Datagrid>
			);
		case "mustrenew":
			return (
				<Datagrid>
					<GlyphField source="quoted" label="旧部品" />
					<FunctionField
						label="最新版"
						render={(record?: Record<string, unknown>) => (record?.quoted as string)?.split("@")[0]}
					/>
					<NumberField source="quoteCount" label="引用しているグリフ数" />
					<FunctionField
						label="一括更新"
						render={(record?: Record<string, unknown>) => {
							const newest = (record?.quoted as string)?.split("@")[0];
							if (!newest) {
								return null;
							}
							return (
								<a href={`https://glyphwiki.org/wiki/Special:Mustrenew?view=listup&target=${newest}`}>
									一括更新
								</a>
							);
						}}
					/>
				</Datagrid>
			);
	}
};

export const resourcesFactory = ({ result }: GWVJSON) => {
	const resources: ResourceProps[] = [];

	for (const { validatorName, errorCode, title, entryType } of validateItems) {
		if (!(result[validatorName]?.[errorCode])) {
			continue;
		}

		const list = (props: Omit<ListProps, "children">) => (
			<List
				{...props}
				bulkActionButtons={false}
				title={title}
			>
				<EntryRenderer entryType={entryType} />
			</List>
		);

		resources.push({
			name: `${validatorName}/${errorCode}`,
			list,
			options: { label: title },
		});
	}

	return resources;
};
