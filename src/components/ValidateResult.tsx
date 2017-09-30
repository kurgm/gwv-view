import * as React from "react";

// import spacing from "material-ui/styles/spacing";

import CircularProgress from "material-ui/Progress/CircularProgress";

import { StyledComponentProps } from "material-ui";
import withStyles from "material-ui/styles/withStyles";

import PagingTable from "./PagingTable";

const styles = {
	content: {
		// margin: spacing.desktopGutter,
		margin: 24, // TODO avoid magic number
	} as React.CSSProperties,
};

export interface IValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[]; } | null;
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.SFC<{ item: T; }>;
}

export class ValidateResult extends React.Component<
	IValidateResultProps<any> & StyledComponentProps<keyof typeof styles>, {}> {
	public shouldComponentUpdate(
		nextProps: Readonly<IValidateResultProps<any> & StyledComponentProps<keyof typeof styles>>) {
		return this.props.result !== nextProps.result;
	}
	public render() {
		return (
			<div className={this.props.classes!.content}>
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

}

export default withStyles(styles)(ValidateResult);
