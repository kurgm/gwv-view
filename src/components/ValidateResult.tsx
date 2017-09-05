import * as React from "react";

// import spacing from "material-ui/styles/spacing";

import CircularProgress from "material-ui/Progress/CircularProgress";

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
				// margin: spacing.desktopGutter,
			} as React.CSSProperties,
		};
	}
}

export default ValidateResult;
