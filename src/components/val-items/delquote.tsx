import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = [string, string]; // glyph name, buhin name

const id = "delquote";
const title = "削除された部品";

const DelquoteComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						最新版が削除されているグリフを引用しているグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "最新版が存在しない部品を引用しています。";
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

const validationItem = {id, title, Component: DelquoteComponent};
export default validationItem;
