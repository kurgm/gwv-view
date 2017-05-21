declare module "*.md" {
	const content: string;
	export = content;
}

// Overwrite incorrect definitions
declare module "material-ui/utils/withWidth" {
	interface IProps {
		width: number;
	}
	// It should be type subtraction, but TypeScript doesn't support it yet
	export default function withWidth<P>(options?: Options):
		(component: React.ComponentClass<P & IProps>) => React.ComponentClass<P>;
}

type KageLine = [number, string];
