export type ImageType = "none" | "png50" | "svg";
export const imageTypes: ImageType[] = ["none", "png50", "svg"];

export interface Config {
	imageType: ImageType;
}

export const defaultConfig: Config = {
	imageType: "png50",
};
