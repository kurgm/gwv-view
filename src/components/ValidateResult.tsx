import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import TableHead from "@material-ui/core/TableHead/TableHead";

import makeStyles from "@material-ui/core/styles/makeStyles";

import PagingTable from "./PagingTable";

const useStyles = makeStyles({
	content: {
		// margin: spacing.desktopGutter,
		margin: "24px 0", // TODO avoid magic number
	},
	descriptionWrapper: {
		margin: "0 24px", // TODO avoid magic number
	},
});

export interface ValidateResultProps<T> {
	description: React.ReactChild;
	result: { [type: string]: T[] } | null;
	getGroupTitle(type: string): string;
	getTableHeaderRow(type: string): React.ReactChild;
	getRowRenderer(type: string): React.FunctionComponent<{ item: T }>;
}

export const ValidateResult: React.FunctionComponent<ValidateResultProps<any>> = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.content}>
			<div className={classes.descriptionWrapper}>
				{props.description}
			</div>
			{props.result
				? (
					Object.keys(props.result).map((type) => (
						props.result![type].length
							? (
								<PagingTable
									key={type}
									title={props.getGroupTitle(type)}
									thead={
										<TableHead>
											{props.getTableHeaderRow(type)}
										</TableHead>
									}
									RowRenderer={props.getRowRenderer(type)}
									items={props.result![type]} />
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
};

export default ValidateResult;
