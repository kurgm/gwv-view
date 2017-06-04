import * as React from "react";

import { Glyph, ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = string[];

class DonotuseComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "donotuse";
	public static title = "Do not use";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						「最新版がdo-not-useを引用するグリフ」を引用しているグリフを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(_type: string) {
		return "最新版がdo-not-useを引用しているグリフを引用しています。";
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				"引用されているグリフ",
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue; }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				props.item.slice(1).map((name, i) => (
					<Glyph name={name} key={i} />
				)),
			]} />
		);
	}
}

export default DonotuseComponent;
