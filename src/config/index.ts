import * as React from "react";

export type ImageType = "none" | "png50" | "svg";
export const imageTypes: ImageType[] = ["none", "png50", "svg"];

export interface Config {
	imageType: ImageType;
}

const defaultConfig: Config = {
	imageType: "png50",
};

const LOCALSTORAGE_KEY = "preferences";

export const getConfig = (): Config => {
	const config: Config = { ...defaultConfig };

	const storedConfigString = localStorage.getItem(LOCALSTORAGE_KEY);
	if (storedConfigString !== null) {
		try {
			Object.assign(config, JSON.parse(storedConfigString));
		} catch (e) {
			console.log(e);
		}
	}
	return config;
};

const configHooks = new Set<React.Dispatch<React.SetStateAction<Config>>>();

export const setConfig = (config: Config): void => {
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(config));
	configHooks.forEach((hook) => {
		hook(config);
	});
};

export const useConfig = (): Config => {
	const [value, setValue] = React.useState(getConfig());
	React.useEffect(() => {
		configHooks.add(setValue);
		return () => {
			configHooks.delete(setValue);
		};
	}, []);
	return value;
};
