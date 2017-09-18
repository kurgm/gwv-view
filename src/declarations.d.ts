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

interface IClassesProps<S extends { [name: string]: React.CSSProperties; }> {
	classes: {[K in keyof S]: string; };
}

// temporarily...
// https://github.com/callemall/material-ui/pull/8214
declare module "material-ui/Select/Select" {
	import { StyledComponent, Omit } from 'material-ui';
	import { InputProps } from "material-ui/Input";

	export type SelectProps = {
		input?: React.ReactNode;
		native?: boolean;
		multiple?: boolean;
		MenuProps?: Object;
		renderValue?: Function;
		value?: Array<string | number> | string | number;
	} & Partial<Omit<InputProps, "value">>;
	export default class Select extends StyledComponent<SelectProps> {}
}

declare module "material-ui/Select" {
	export { default } from 'material-ui/Select/Select';
	export * from 'material-ui/Select/Select';
}
