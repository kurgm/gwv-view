declare module "*.md" {
	const content: string;
	export = content;
}

// Overwrite incorrect definitions
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

	// It should be type subtraction, but TypeScript doesn't support it yet
	export default function withWidth<P = {}>(options?: WithWidthOptions):
		(component: React.ComponentClass<P & WithWidthProps>) => React.ComponentClass<P>;
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
