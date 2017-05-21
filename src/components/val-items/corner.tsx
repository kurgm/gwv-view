import * as React from "react";
import * as ReactDOM from "react-dom";

import {
	Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from "material-ui/Table";

import ValidateResult from "../ValidateResult";

type IValue = [string, KageLine, KageLine];

class CornerComponent extends React.Component<{ result: { [type: string]: IValue[]; }; }, {}> {
	public static id = "corner";
	public static title = "カド形状・接続";

	public render() {
		return (
			<ValidateResult
				description={
					<p>
						データ上のカド形状と実際の筆画の位置関係との不整合や、近接しているが接続していないカド・接続を検出します。
					</p>
				}
				getGroupTitle={this.getGroupTitle}
				getTableHeaderRow={this.getTableHeaderRow}
				getRowRenderer={this.getRowRenderer}
				result={this.props.result}
			/>
		);
	}

	private getGroupTitle(typeStr: string) {
		const type = parseInt(typeStr, 16);
		if (type === 0x19) {
			return "左下カドに接続(縦)形状が使用されています。（左下zh用旧形状を使用するべきでしょう。）";
		} else if (type === 0x14) {
			return "左下zh用旧形状が使用されていますが、左下カド形状を使用するべきかもしれません。";
		} else if (type === 0x16) {
			return "左下zh用新形状が使用されていますが、左下カド形状を使用するべきかもしれません。";
		} else if (type === 0x61) {
			return "左下カド形状が使用されていますが、左下zh用新形状を使用するべきかもしれません。";
		}
		const s = ["左上カド", "左下カド", "右上カド", "右下カド", "左下zh用旧カド", "擬似右下H/Tカド", "左下zh用新カド", "接続(横)", "開放", "接続(縦)", "右下H/Tカド"];
		if (type % 0x11 === 0) {
			return `${s[type & 0xf]}が離れています。`;
		}
		return `${s[type >> 4]}に${s[type & 0xf]}形状が使用されています。`;
	}
	private getTableHeaderRow(type: string) {
		return (
			// TODO: implement
			<TableRow />
		);
	}
	private getRowRenderer(type: string) {
		return (props: { item: IValue; }) => (
			// TODO: implement
			<TableRow />
		);
	}
}

export default CornerComponent;
