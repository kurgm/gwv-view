import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = [string];

const id = "width";
const title = "全角・半角";

const WidthComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
					<a href="https://glyphwiki.org/wiki/Group:HalfwidthGlyphs">グループ:HalfwidthGlyphs</a>
						のサブグループのいずれかに含まれているかどうかとグリフが半角かどうかが一致しないものを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	const titleMap: { [type: string]: string } = {
		0: "グループ:NonSpacingGlyphs-Halfwidthに含まれていますが全角です。",
		1: "グループ:HalfwidthGlyphs-*に含まれていますが全角です。",
		2: "半角ですがグループ:HalfwidthGlyphs-*に含まれていません。",
	};
	return titleMap[type];
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef(0),
		},
	];
};

const validationItem = {id, title, Component: WidthComponent};
export default validationItem;
