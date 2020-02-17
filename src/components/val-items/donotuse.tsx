import * as React from "react";

import {Column} from "material-table";

import Glyph from "../Glyph";
import ValidateResult, {glyphColumnDef} from "../ValidateResult";

type IValue = string[];

const id = "donotuse";
const title = "Do not use";

const DonotuseComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						「最新版がdo-not-useを引用するグリフ」を引用しているグリフを検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getColumnDefs={getColumnDefs}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "最新版がdo-not-useを引用しているグリフを引用しています。";
};
const getColumnDefs = (_type: string): Column<IValue>[] => {
	return [
		{
			title: "グリフ名",
			...glyphColumnDef<IValue, number>(0),
		},
		{
			title: "引用されているグリフ",
			sorting: false,
			render(item) {
				return item.slice(1).map((name, i) => (
					<Glyph name={name} key={i} />
				));
			},
		},
	];
};

const validationItem = {id, title, Component: DonotuseComponent};
export default validationItem;
