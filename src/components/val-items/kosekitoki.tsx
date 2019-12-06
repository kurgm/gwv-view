import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = string[];

const id = "kosekitoki";
const title = "kosekiとtoki-00";

const KosekitokiComponent: React.FunctionComponent<{ result: { [type: string]: IValue[] } | null }> = (props) => {
	return (
		<ValidateResult
			description={
				<p>
						koseki-######のエイリアスになっていないtoki-00######を検出します。
				</p>
			}
			getGroupTitle={getGroupTitle}
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
			result={props.result}
		/>
	);
};

const getGroupTitle = (type: string) => {
	const titleMap: { [type: string]: string } = {
		0: "エイリアスになっていません。",
		1: "koseki-xxxxxxのエイリアスになっていません。",
		2: "koseki-xxxxxxと異なるエイリアスです。",
	};
	return titleMap[type];
};
const getTableHeaderRow = (type: string) => {
	const columns = (() => {
		switch (type as "0" | "1" | "2") {
			case "0":
				return ["グリフ名"];
			case "1":
				return ["グリフ名", "実体"];
			case "2":
				return ["グリフ名", "実体", "koseki-xxxxxxの実体"];
		}
		return [];
	})();
	return (
		<SimpleColumnHeader columns={columns} />
	);
};
const getRowRenderer = (_type: string) => {
	const RowRenderer = (props: { item: IValue }) => (
		<SimpleColumnRow columns={props.item.map((name, i) => (
			<Glyph name={name} key={i} />
		))} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: KosekitokiComponent};
export default validationItem;
