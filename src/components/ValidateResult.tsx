import * as React from "react";
import * as ReactDOM from "react-dom";

import {
	Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from "material-ui/Table";

export interface IValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[]; };
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.SFC<{ item: T; }>;
}

class ValidateResult extends React.Component<IValidateResultProps<any>, {}> {
	public render() {
		return (
			<div>
				{this.props.description}
				{Object.keys(this.props.result).map((type) => {
					const RowRenderer = this.props.getRowRenderer(type);
					return (
						<div>
							<h2>{this.props.getGroupTitle(type)}</h2>
							<Table
								selectable={false}
							>
								<TableHeader>
									{/* TODO: search bar */}
									{this.props.getTableHeaderRow(type)}
								</TableHeader>
								<TableBody>
									{this.props.result[type].map((item) => (
										<RowRenderer item={item} />
									))}
								</TableBody>
								{/* TODO: pager */}
							</Table>
						</div>
					);
				})}
			</div>
		);
	}
}

export default ValidateResult;
