import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = [string, string]; // glyph name, buhin name

const id = "order";
const title = "部品の順序";

const OrderComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						-02, -04部品が最初に出現する/-01, -03部品が最後に出現するグリフを検出します。
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
	const position = [null, "左", "右", "上", "下", "囲い結合の外", "囲い結合の中"][type % 10];
	return `${position}にくる部品が${type < 10 ? "最初" : "最後"}に引用されています。`;
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "引用されている部品",
			...glyphColumnDef(1),
		},
	];
};

const validationItem = {id, title, Component: OrderComponent};
export default validationItem;
