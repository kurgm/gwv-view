import * as React from "react";
import {
	Edit,
	EditProps,
	SaveButton,
	SelectInput,
	SimpleForm,
	Toolbar,
} from "react-admin";

const toolbar = (
	<Toolbar>
		<SaveButton />
	</Toolbar>
);

const ConfigEdit: React.FC<Omit<EditProps, "children">> = (props) => (
	<Edit resource="config" id="undefined" title="設定" {...props}>
		<SimpleForm toolbar={toolbar}>
			<SelectInput
				source="imageType"
				label="画像の形式"
				emptyValue={"none"}
				emptyText={"表示しない"}
				choices={[
					{ id: "png50", name: "PNG (50px)" },
					{ id: "svg", name: "SVG" },
				]}
			/>
		</SimpleForm>
	</Edit>
);

export default ConfigEdit;
