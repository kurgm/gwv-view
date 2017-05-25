import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class IdsComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "ids";
	public static title = "IDSとの不一致";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						グリフ名は「左+右」のIDSであるが実体が「上+下」であるグリフ（またはその逆）や、部品の順序がIDSと異なっているグリフを検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(_type: string): string {
		// TODO: implement this
		throw new Error("Not implemented yet");
	}
	private getTableHeaderRow(_type: string) {
		return (
			<SimpleColumnHeader columns={[
				"グリフ名",
				// TODO
			]} />
		);
	}
	private getRowRenderer(_type: string) {
		return (props: { item: IValue; }) => (
			<SimpleColumnRow columns={[
				<Glyph name={props.item[0]} />,
				// TODO
			]} />
		);
	}
}

export default IdsComponent;
