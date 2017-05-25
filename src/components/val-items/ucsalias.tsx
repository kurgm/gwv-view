import * as React from "react";

import { Glyph, /*KageLine,*/ ValidateResult } from "../ValidateResult";

import { SimpleColumnHeader, SimpleColumnRow } from "../PagingTable";

type IValue = [string/*, TODO */];

class UcsaliasComponent extends React.Component<{ result: { [type: string]: IValue[]; } | null; }, {}> {
	public static id = "ucsalias";
	public static title = "UCSと別名";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						uxxxxがuyyyy-…以外（koseki-######、etc.）のエイリアスになっているもの、UCSの複数欄指定のグリフが無印グリフの
						（uxxxx-gがuxxxxの、etc.）エイリアスになっているもの、UCSの無印と-var-xxxや-itaiji-xxxの実体が同じものを検出します。
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

export default UcsaliasComponent;
