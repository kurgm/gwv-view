import * as React from "react";

import spacing from "material-ui/styles/spacing";

import CircularProgress from "material-ui/CircularProgress";

import PagingTable from "./PagingTable";

export interface IValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[]; } | null;
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.SFC<{ item: T; }>;
}

export class ValidateResult extends React.Component<IValidateResultProps<any>, {}> {
	public shouldComponentUpdate(nextProps: Readonly<IValidateResultProps<any>>) {
		return this.props.result !== nextProps.result;
	}
	public render() {
		const styles = this.getStyles();
		return (
			<div style={styles.content}>
				{this.props.description}
				{this.props.result
					? (
						Object.keys(this.props.result).map((type) => (
							this.props.result![type].length
								? (
									<PagingTable
										key={type}
										title={this.props.getGroupTitle(type)}
										thead={
											<thead>{this.props.getTableHeaderRow(type)}</thead>
										}
										RowRenderer={this.props.getRowRenderer(type)}
										items={this.props.result![type]} />
								)
								: null
						))
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
