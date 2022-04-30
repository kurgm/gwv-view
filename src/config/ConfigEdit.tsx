import * as React from "react";
import { Edit, EditProps, SelectInput, SimpleForm } from "react-admin";

const ConfigEdit: React.FC<EditProps> = (props) => (
	<Edit
		resource="config"
		id="undefined"
		title="設定"
		{...props}
	>
		<SimpleForm>
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
