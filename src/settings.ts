export enum ImageType {
	NONE, PNG50, SVG,
}

export interface ISettings {
	imageType: ImageType;
	itemsPerPage: number;
}

const defaultSettings: ISettings = {
	imageType: ImageType.PNG50,
	itemsPerPage: 10,
};

let currentSettings = defaultSettings;
{
	const settingsString = localStorage.getItem("preference");
	if (settingsString !== null) {
		currentSettings = {
			...defaultSettings,
			...JSON.parse(settingsString) as ISettings,
		};
	}
}

export function getSettings() {
	return currentSettings;
}

export function setSettings(newSettings: ISettings) {
	localStorage.setItem("preference", JSON.stringify(newSettings));
	currentSettings = newSettings;
}

// export function updateSettings(settings: Partial<ISettings>) {
// 	const newSettings: ISettings = {
// 		...currentSettings,
// 		...settings,
// 	};
export function updateSettings<K extends keyof ISettings>(settings: Pick<ISettings, K>) {
	const newSettings: ISettings = {...currentSettings};
	(Object.keys(settings) as K[]).forEach((k) => {
		newSettings[k] = settings[k];
	});
	setSettings(newSettings);
}
