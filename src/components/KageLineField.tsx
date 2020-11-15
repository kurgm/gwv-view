import * as React from "react";
import { TextFieldProps } from 'react-admin';

export type KageLineFieldProps = TextFieldProps;

const KageLineField = ({ record, source }: KageLineFieldProps) => {
	if (!(record && source)) {
		return null;
	}
	const [linenumber, data] = record[source] as [number, string];
	return (
		<span>
			{linenumber + 1}行目：
			<code>{data}</code>
		</span>
	);
};

export default KageLineField;
