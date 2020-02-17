import * as React from "react";

const KageLine: React.FunctionComponent<{ data: KageLineData }> = (props) => (
	<span>
		{props.data[0] + 1}行目：
		<code>{props.data[1]}</code>
	</span>
);

export default KageLine;
