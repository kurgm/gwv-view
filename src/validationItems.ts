import CornerComponent from "./components/val-items/corner";
// import RelatedComponent from "./components/val-items/related";
// import IllegalComponent from "./components/val-items/illegal";
// import SkewComponent from "./components/val-items/skew";
// import DonotuseComponent from "./components/val-items/donotuse";
// import KosekitokiComponent from "./components/val-items/kosekitoki";
// import MjComponent from "./components/val-items/mj";
// import UcsaliasComponent from "./components/val-items/ucsalias";
// import DupComponent from "./components/val-items/dup";
// import NamingComponent from "./components/val-items/naming";
// import IdsComponent from "./components/val-items/ids";
// import OrderComponent from "./components/val-items/order";
// import DelquoteComponent from "./components/val-items/delquote";
// import DelvarComponent from "./components/val-items/delvar";
// import NumexpComponent from "./components/val-items/numexp";
// import MustrenewComponent from "./components/val-items/mustrenew";
// import JComponent from "./components/val-items/j";
// import WidthComponent from "./components/val-items/width";

export interface IValidateResultComponent extends React.ComponentClass<{ result: { [type: string]: any[]; } | null; }> {
	id: string;
	title: string;
}

const validationItems: IValidateResultComponent[] = [
	CornerComponent,
	// RelatedComponent,
	// IllegalComponent,
	// SkewComponent,
	// DonotuseComponent,
	// KosekitokiComponent,
	// MjComponent,
	// UcsaliasComponent,
	// DupComponent,
	// NamingComponent,
	// IdsComponent,
	// OrderComponent,
	// DelquoteComponent,
	// DelvarComponent,
	// NumexpComponent,
	// MustrenewComponent,
	// JComponent,
	// WidthComponent,
];

export default validationItems;
