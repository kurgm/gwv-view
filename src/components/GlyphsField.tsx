import * as React from "react";
import { TextFieldProps } from 'react-admin';

import GlyphLink from "./GlyphLink";

export type GlyphsFieldProps = TextFieldProps;

const GlyphsField = ({ record, source }: GlyphsFieldProps) => (
	record && source
		? (
			<span>
				{...(record[source] as string[]).map((name, index) => <GlyphLink name={name} key={index} />)}
			</span>
		)
		: null
);

export default GlyphsField;
