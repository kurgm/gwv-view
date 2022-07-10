import * as React from "react";
import { TextFieldProps, useRecordContext } from "react-admin";

export type KageLineFieldProps = TextFieldProps;

const KageLineField: React.FC<KageLineFieldProps> = ({ source }) => {
	const record = useRecordContext();
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
