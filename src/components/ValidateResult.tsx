import * as React from "react";
import * as ReactDOM from "react-dom";

import spacing from "material-ui/styles/spacing";

import CircularProgress from "material-ui/CircularProgress";
import {
	Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from "material-ui/Table";

export interface IValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[]; } | null;
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.SFC<{ item: T; }>;
}

export class ValidateResult extends React.Component<IValidateResultProps<any>, {}> {
	public render() {
		const styles = this.getStyles();
		return (
			<div style={styles.content}>
				{this.props.description}
				{this.props.result
					? (
						Object.keys(this.props.result).map((type) => {
							const RowRenderer = this.props.getRowRenderer(type);
							return (
								<div key={type}>
									<h2>{this.props.getGroupTitle(type)}</h2>
									{/* TODO: search bar */}
									<Table selectable={false}>
										<TableHeader>
											{this.props.getTableHeaderRow(type)}
										</TableHeader>
										<TableBody>
											{this.props.result![type].slice(0, /* FIXME */ 50).map((item, idx) => (
												<RowRenderer item={item} key={idx} />
											))}
										</TableBody>
										{/* TODO: pager */}
									</Table>
								</div>
							);
						})
					)
					: (
						<div style={{ textAlign: "center" }}>
							<CircularProgress />
						</div>
					)
				}
			</div>
		);
	}

	private getStyles() {
		return {
			content: {
				margin: spacing.desktopGutter,
			} as React.CSSProperties,
		};
	}
}

export const SimpleColumnHeader = (params: { columns: React.ReactNode[] }) => (
	<TableRow>
		{params.columns.map((column, i) => (
			<TableHeaderColumn key={`${i}`}>
				{column}
			</TableHeaderColumn>
		))}
	</TableRow>
);

export const SimpleColumnRow = (params: { columns: React.ReactNode[] }) => (
	<TableRow hoverable>
		{params.columns.map((column, i) => (
			<TableRowColumn key={`${i}`}>
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
