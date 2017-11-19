declare module "*.md" {
	const content: string;
	export = content;
}

// Overwrite incorrect definitions

// https://github.com/callemall/material-ui/pull/9125
declare module "material-ui/utils/withWidth" {
	import { Breakpoint } from "material-ui/styles/createBreakpoints";
	export interface WithWidthOptions {
		resizeInterval: number;
	}

	export interface WithWidthProps {
		width: Breakpoint;
	}

	/**
	 * By default, returns true if screen width is the same or greater than the given breakpoint.
	 */
	export const isWidthUp: (breakpoint: Breakpoint, screenWidth: Breakpoint, inclusive?: boolean) => boolean;

	/**
	 * By default, returns true if screen width is the same or less than the given breakpoint.
	 */
	export const isWidthDown: (breakpoint: Breakpoint, screenWidth: Breakpoint, inclusive?: boolean) => boolean;

	export default function withWidth(
		options?: WithWidthOptions
	): <P>(
			component: React.ComponentType<P & WithWidthProps>
		) => React.ComponentClass<P & Partial<WithWidthProps>>;
}

type KageLineData = [number, string];

// tslint:disable-next-line:interface-name
interface Window {
	gwvCallback: (data: IJSONPCallback) => void;
}

interface IJSONPCallback {
	result: { [id: string]: { [type: string]: any[]; }; };
	lastModified: number;
}
