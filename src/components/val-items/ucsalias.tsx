import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

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
			getTableHeaderRow={getTableHeaderRow}
			getRowRenderer={getRowRenderer}
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
const getTableHeaderRow = (_type: string) => {
	return (
		<SimpleColumnHeader columns={[
			"グリフ名",
			"実体",
		]} />
	);
};
const getRowRenderer = (type: string) => {
	if (type === "1") {
		const RowRenderer = (props: { item: IValueWithoutEntity }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<Glyph name={props.item[0].split("-")[0]} />,
			]} />
		);
		return RowRenderer;
	}
	const RowRenderer = (props: { item: IValueWithEntity }) => (
		<SimpleColumnRow columns={[
			<Glyph name={props.item[0]} />,
			<Glyph name={props.item[1]} />,
		]} />
	);
	return RowRenderer;
};

const validationItem = {id, title, Component: UcsaliasComponent};
export default validationItem;
