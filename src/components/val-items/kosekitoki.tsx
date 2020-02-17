import * as React from "react";

import {Column} from "material-table";

import ValidateResult, {glyphColumnDef} from "../ValidateResult";

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
			getColumnDefs={getColumnDefs}
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
const getColumnDefs = (type: string): Column<IValue>[] => {
	switch (type as "0" | "1" | "2") {
		case "0":
			return [
				{
					title: "グリフ名",
					...glyphColumnDef<IValue, number>(0),
				},
			];
		case "1":
			return [
				{
					title: "グリフ名",
					...glyphColumnDef<IValue, number>(0),
				},
				{
					title: "実体",
					...glyphColumnDef<IValue, number>(1),
				},
			];
		case "2":
			return [
				{
					title: "グリフ名",
					...glyphColumnDef<IValue, number>(0),
				},
				{
					title: "実体",
					...glyphColumnDef<IValue, number>(1),
				},
				{
					title: "koseki-xxxxxxの実体",
					...glyphColumnDef<IValue, number>(2),
				},
			];
	}
	return [];
};

const validationItem = {id, title, Component: KosekitokiComponent};
export default validationItem;
