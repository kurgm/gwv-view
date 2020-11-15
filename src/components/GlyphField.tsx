import * as React from "react";
import { TextFieldProps } from 'react-admin';
import GlyphLink from "./GlyphLink";

export type GlyphFieldProps = TextFieldProps;

const GlyphField = ({ record, source }: GlyphFieldProps) => (
	record && source
		? <GlyphLink name={record[source] as string} />
		: null
);

export default GlyphField;
