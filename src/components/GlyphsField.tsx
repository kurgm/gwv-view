import * as React from "react";
import { TextFieldProps, useRecordContext } from 'react-admin';

import GlyphLink from "./GlyphLink";

export type GlyphsFieldProps = TextFieldProps;

const GlyphsField: React.FC<GlyphsFieldProps> = ({ source }) => {
	const record = useRecordContext();
	if (!(record && source)) {
		return null;
	}
	const names = record[source] as string[];
	return (
		<span>
			{...names.map((name, index) => (
				<GlyphLink name={name} key={index} />
			))}
		</span>
	);
};

export default GlyphsField;
