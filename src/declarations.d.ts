declare module "*.md" {
	const content: string;
	export = content;
}

// Overwrite incorrect definitions
declare module "material-ui/utils/withWidth" {
	export default function withWidth<C extends React.ComponentClass<P & { width: number; }>, P>(options?: Options):
		(component: C) => React.ComponentClass<P>;
}
