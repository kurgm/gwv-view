import CornerComponent from "./components/val-items/corner";
import DelquoteComponent from "./components/val-items/delquote";
import DelvarComponent from "./components/val-items/delvar";
import DonotuseComponent from "./components/val-items/donotuse";
import DupComponent from "./components/val-items/dup";
import IdsComponent from "./components/val-items/ids";
import IllegalComponent from "./components/val-items/illegal";
import JComponent from "./components/val-items/j";
import KosekitokiComponent from "./components/val-items/kosekitoki";
import MjComponent from "./components/val-items/mj";
import MustrenewComponent from "./components/val-items/mustrenew";
import NamingComponent from "./components/val-items/naming";
import NumexpComponent from "./components/val-items/numexp";
import OrderComponent from "./components/val-items/order";
import RelatedComponent from "./components/val-items/related";
import SkewComponent from "./components/val-items/skew";
import UcsaliasComponent from "./components/val-items/ucsalias";
import WidthComponent from "./components/val-items/width";

export interface ValidationItem {
	id: string;
	title: string;
	Component: React.ElementType<{ result: { [type: string]: any[] } | null }>;
}

const validationItems: ValidationItem[] = [
	CornerComponent,
	RelatedComponent,
	IllegalComponent,
	SkewComponent,
	DonotuseComponent,
	KosekitokiComponent,
	MjComponent,
	UcsaliasComponent,
	DupComponent,
	NamingComponent,
	IdsComponent,
	OrderComponent,
	DelquoteComponent,
	DelvarComponent,
	NumexpComponent,
	MustrenewComponent,
	JComponent,
	WidthComponent,
];

export default validationItems;
