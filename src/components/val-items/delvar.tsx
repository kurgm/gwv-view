import * as React from "react";

import Glyph from "../Glyph";
import ValidateResult from "../ValidateResult";

import {SimpleColumnHeader, SimpleColumnRow} from "../PagingTable";

type IValue = [string, string]; // glyph name, base name

class DelvarComponent extends React.Component<{ result: { [type: string]: IValue[] } | null }, {}> {
	public static id = "delvar";
	public static title = "無の派生";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						…-(var/itaiji)-xxxという名前であるが派生元（の最新版）が存在しないグリフを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle = (_type: string) => {
		return "派生元が存在しません。";
	}
	private getTableHeaderRow = (_type: string) => {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				"派生元",
			]} />
		);
	}
	private getRowRenderer = (_type: string) => {
		return (props: { item: IValue }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				<Glyph name={props.item[1]} />,
			]} />
		);
	}
}

export default DelvarComponent;
