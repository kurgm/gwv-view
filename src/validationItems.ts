import ValidateResult from "./components/ValidateResult";

import CornerComponent from "./components/val-items/corner";

export interface IValidateResultComponent extends React.ComponentClass<{ result: { [type: string]: any[]; } | null; }> {
	id: string;
	title: string;
}

const validationItems: IValidateResultComponent[] = [
	CornerComponent,
];

export default validationItems;
