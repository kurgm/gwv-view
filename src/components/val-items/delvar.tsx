import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

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
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (_type: string) => {
	return "派生元が存在しません。";
};
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
			"派生元",
		]} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			<Glyph name={props.item[1]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: DelvarComponent};
export default validationItem;
