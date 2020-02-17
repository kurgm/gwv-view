import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import {makeStyles} from "@material-ui/core/styles";

import {Column} from "material-table";

import PagingTable from "./PagingTable";
import Glyph from "./Glyph";
import KageLine from "./KageLine";

const useStyles = makeStyles({
	content: {
		// margin: spacing.desktopGutter,
		margin: "24px 0", // TODO avoid magic number
	},
	descriptionWrapper: {
		margin: "0 24px", // TODO avoid magic number
	},
});

export interface ValidateResultProps<T extends object> {
	description: React.ReactChild;
	result: { [type: string]: T[] } | null;
	getGroupTitle(type: string): string;
	getColumnDefs(type: string): Column<T>[];
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
									columns={props.getColumnDefs(type)}
									items={props.result![type]}
								/>
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

export const glyphColumnDef = <
	IValue extends { [key in Index]: string },
	Index extends string | number,
>(field: Index): Column<IValue> => ({
	field: `${field}`,
	render(item) {return <Glyph name={item[field]} />;},
});

export const kageLineColumnDef = <
	IValue extends { [key in Index]: KageLineData },
	Index extends string | number,
>(field: Index): Column<IValue> => ({
	field,
	render(item) {return <KageLine data={item[field]} />;},
});
