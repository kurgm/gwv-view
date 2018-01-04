declare module "*.md" {
	const content: string;
	export = content;
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
