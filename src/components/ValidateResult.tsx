import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import TableHead from "@material-ui/core/TableHead/TableHead";

import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

import PagingTable from "./PagingTable";

const styles = {
	content: {
		// margin: spacing.desktopGutter,
		margin: "24px 0", // TODO avoid magic number
	},
	descriptionWrapper: {
		margin: "0 24px", // TODO avoid magic number
	},
};

export interface ValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[] } | null;
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.SFC<{ item: T }>;
}

export class ValidateResult extends React.Component<
	ValidateResultProps<any> & WithStyles<keyof typeof styles>, {}> {
	public shouldComponentUpdate(
		nextProps: Readonly<ValidateResultProps<any> & WithStyles<keyof typeof styles>>) {
		return this.props.result !== nextProps.result;
	}
	public render() {
		return (
			<div className={this.props.classes.content}>
				<div className={this.props.classes.descriptionWrapper}>
					{this.props.description}
				</div>
				{this.props.result
					? (
						Object.keys(this.props.result).map((type) => (
							this.props.result![type].length
								? (
									<PagingTable
										key={type}
										title={this.props.getGroupTitle(type)}
										thead={
											<TableHead>
												{this.props.getTableHeaderRow(type)}
											</TableHead>
										}
										RowRenderer={this.props.getRowRenderer(type)}
										items={this.props.result![type]} />
								)
								: null
						))
					)
					: (
						<div style={{textAlign: "center"}}>
							<CircularProgress />
						</div>
					)
				}
			</div>
		);
	}

}

export default withStyles(styles)(ValidateResult);
