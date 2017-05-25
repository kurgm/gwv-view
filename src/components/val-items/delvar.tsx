import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class DelvarComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
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

export default DelvarComponent;
