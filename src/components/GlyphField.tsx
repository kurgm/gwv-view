import * as React from "react";
import { TextFieldProps, useRecordContext } from 'react-admin';
import GlyphLink from "./GlyphLink";

export type GlyphFieldProps = TextFieldProps;

const GlyphField: React.FC<GlyphFieldProps> = ({ source }) => {
	const record = useRecordContext();
	if (!(record && source)) {
		return null;
	}
	const name = record[source] as string;
	return <GlyphLink name={name} />;
};

export default GlyphField;
