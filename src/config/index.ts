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

export const getConfig: () => Readonly<Config> = (() => {
	let memo: { config: Readonly<Config>; string: string | null } | null = null;
	return () => {
		const storedConfigString = localStorage.getItem(LOCALSTORAGE_KEY);
		if (memo !== null && memo.string === storedConfigString) {
			return memo.config;
		}

		const config: Config = { ...defaultConfig };
		if (storedConfigString !== null) {
			try {
				Object.assign(config, JSON.parse(storedConfigString));
			} catch (e) {
				console.log(e);
			}
		}
		memo = { config, string: storedConfigString };
		return config;
	};
})();

const configCallbacks = new Set<() => void>();

export const setConfig = (config: Config): void => {
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(config));
	configCallbacks.forEach((callback) => {
		callback();
	});
};

const subscribeConfigChange = (callback: () => void) => {
	configCallbacks.add(callback);
	return () => {
		configCallbacks.delete(callback);
	};
};

export const useConfig = (): Readonly<Config> => {
	return React.useSyncExternalStore(subscribeConfigChange, getConfig);
};
