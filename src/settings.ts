export enum ImageType {
	NONE, PNG50, SVG,
}

export interface Settings {
	imageType: ImageType;
	itemsPerPage: number;
}

const defaultSettings: Settings = {
	imageType: ImageType.PNG50,
	itemsPerPage: 10,
};

let currentSettings = defaultSettings;
{
	const settingsString = localStorage.getItem("preference");
	if (settingsString !== null) {
		currentSettings = {
			...defaultSettings,
			...JSON.parse(settingsString) as Settings,
		};
	}
}

export function getSettings() {
	return currentSettings;
}

export function setSettings(newSettings: Settings) {
	localStorage.setItem("preference", JSON.stringify(newSettings));
	currentSettings = newSettings;
}

export function updateSettings(settings: Partial<Settings>) {
	const newSettings: Settings = {
		...currentSettings,
		...settings,
	};
	setSettings(newSettings);
}
