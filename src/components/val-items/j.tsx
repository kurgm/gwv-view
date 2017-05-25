import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class JComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "j";
	public static title = "地域字形";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						地域ソースが存在しない地域指定グリフ、Jソースが存在する-jvのグリフ、Kソースが存在する-kvのグリフ、仮想J字形に使わない字形の部品が使われているuxxxx(-jv), extf-, irg2015-のグリフを検出します。
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

export default JComponent;
