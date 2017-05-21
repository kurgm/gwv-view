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

export class ValidateResult extends React.Component<IValidateResultProps<any>, {}> {
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

export const SimpleColumnRow = (params: { columns: React.ReactNode[] }) => (
	<TableRow>
		{params.columns.map((column) => (
			<TableRowColumn>
				{column}
			</TableRowColumn>
		))}
	</TableRow>
);

export class Glyph extends React.Component<{ name: string }, {}> {
	public render() {
		// FIXME: should do lazy loading
		return (
			<a href={`https://glyphwiki.org/wiki/${this.props.name}`} className="glyphLink">
				<img
					src={`https://glyphwiki.org/glyph/${this.props.name}.50px.png`}
					width="50"
					height="50"
					alt={this.props.name}
					className="thumb"
				/>
				{this.props.name}
			</a>
		);
	}
}

export const KageLine = (props: { data: KageLineData }) => (
	<span>
		{props.data[0] + 1}行目：
		<code>{props.data[1]}</code>
	</span>
);

export default ValidateResult;
