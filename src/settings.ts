export enum ImageType {
	NONE, PNG50, SVG,
}

export interface ISettings {
	imageType: ImageType;
}

const defaultSettings: ISettings = {
	imageType: ImageType.PNG50,
};

let currentSettings = defaultSettings;
{
	const settingsString = localStorage.getItem("preference");
	if (settingsString !== null) {
		currentSettings = JSON.parse(settingsString) as ISettings;
	}
}

export function getSettings() {
	return currentSettings;
}

export function setSettings(newSettings: ISettings) {
	localStorage.setItem("preference", JSON.stringify(newSettings));
	currentSettings = newSettings;
}

export function updateSettings(settings: Partial<ISettings>) {
	const newSettings: ISettings = {
		...currentSettings,
		...settings,
	};
	setSettings(newSettings);
}
