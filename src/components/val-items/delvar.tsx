import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = [string, string]; // glyph name, base name

const id = "delvar";
const title = "無の派生";

const DelvarComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						…-(var/itaiji)-xxxという名前であるが派生元（の最新版）が存在しないグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "派生元が存在しません。";
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
		{
			title: "派生元",
			...glyphColumnDef(1),
		},
	];
};

const validationItem = {id, title, Component: DelvarComponent};
export default validationItem;
