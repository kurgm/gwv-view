import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

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
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "最新版がdo-not-useを引用しているグリフを引用しています。";
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
			"引用されているグリフ",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			props.item.slice(1).map((name, i) => (
				<Glyph name={name} key={i} />
			)),
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: DonotuseComponent};
export default validationItem;
