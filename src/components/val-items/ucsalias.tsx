import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValueWithoutEntity = [string];
type IValueWithEntity = [string, string];
type IValue = IValueWithoutEntity | IValueWithEntity;

const id = "ucsalias";
const title = "UCSと別名";

const UcsaliasComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						uxxxxがuyyyy-…以外（koseki-######、etc.）のエイリアスになっているもの、UCSの複数欄指定のグリフが無印グリフの
						（uxxxx-gがuxxxxの、etc.）エイリアスになっているもの、UCSの無印と-var-xxxや-itaiji-xxxの実体が同じものを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (typeStr: string) => {
	const type = parseInt(typeStr, 10);
	switch (type) {
		case 0:
			return "uxxxxがuyyyy-…以外やIDSグリフのエイリアスになっています。";
		case 1:
			return "UCSの複数欄指定のグリフがその無印グリフのエイリアスになっています。";
		default: {
			const varOrItaiji = type < 20 ? "var" : "itaiji";
			if (type % 10 === 1) {
				return `uxxxxがuxxxx-${varOrItaiji}-###のエイリアスになっています。`;
			}
			return `uxxxx-${varOrItaiji}-###がuxxxx(の実体)のエイリアスになっています。`;
		}
	}
};
const getColumnDefs = (type: string): Column<IValue>[] => {
	if (type === "1") {
		const columns: Column<IValueWithoutEntity>[] = [
			{
				title: "グリフ名",
				...glyphColumnDef(0),
			},
			{
				title: "実体",
				sorting: false,
				render(item) {
					return <Glyph name={item[0].split("-")[0]} />;
				}
			},
		];
		return columns as Column<IValue>[];
	}
	const columns: Column<IValueWithEntity>[] = [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "実体",
			...glyphColumnDef(1),
		},
	];
	return columns as Column<IValue>[];
};

const validationItem = {id, title, Component: UcsaliasComponent};
export default validationItem;
