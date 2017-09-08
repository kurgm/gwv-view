declare module "*.md" {
	const content: string;
	export = content;
}

// // Overwrite incorrect definitions
// declare module "material-ui/utils/withWidth" {
// 	interface IProps {
// 		width: number;
// 	}
// 	// It should be type subtraction, but TypeScript doesn't support it yet
// 	export default function withWidth<P>(options?: Options):
// 		(component: React.ComponentClass<P & IProps>) => React.ComponentClass<P>;
// }

type KageLineData = [number, string];

// tslint:disable-next-line:interface-name
interface Window {
	gwvCallback: (data: IJSONPCallback) => void;
}

interface IJSONPCallback {
	result: { [id: string]: { [type: string]: any[]; }; };
	lastModified: number;
}

interface IClassesProps<S> { classes: {[K in keyof S]: string; }; }


// FIXME: temporarily...
declare module "material-ui/svg-icons/keyboard-arrow-left" {
	import SvgIcon, { SvgIconProps } from "material-ui/SvgIcon";
	let KeyboardArrowLeft: React.SFC<SvgIconProps> & {
		muiName: "SvgIcon";
	};
	export default KeyboardArrowLeft;
}

declare module "material-ui/svg-icons/keyboard-arrow-right" {
	import SvgIcon, { SvgIconProps } from "material-ui/SvgIcon";
	let KeyboardArrowRight: React.SFC<SvgIconProps> & {
		muiName: "SvgIcon";
	};
	export default KeyboardArrowRight;
}

declare module "material-ui-icons/ExpandMore" {
	import SvgIcon, { SvgIconProps } from "material-ui/SvgIcon";
	let ExpandMoreIcon: React.SFC<SvgIconProps> & {
		muiName: "SvgIcon";
	};
	export default ExpandMoreIcon;
}

declare module "material-ui-icons/Menu" {
	import SvgIcon, { SvgIconProps } from "material-ui/SvgIcon";
	let Menu: React.SFC<SvgIconProps> & {
		muiName: "SvgIcon";
	};
	export default Menu;
}

// https://github.com/callemall/material-ui/pull/8026
declare module "material-ui/Radio/RadioGroup" {
	import { Omit, StyledComponent } from "material-ui";
	import { FormGroupProps } from 'material-ui/Form';

	export type RadioGroupProps = {
		name?: string;
		onChange?: (event: React.ChangeEvent<{}>, value: string) => void;
		value?: string;
	} & Partial<Omit<FormGroupProps, 'onChange'>>;

	export default class RadioGroup extends StyledComponent<RadioGroupProps> { }
}

declare module "material-ui/Radio" {
	export { default } from 'material-ui/Radio/Radio';
	export * from 'material-ui/Radio/Radio';
	export { default as RadioGroup } from 'material-ui/Radio/RadioGroup';
	export * from 'material-ui/Radio/RadioGroup';
}
