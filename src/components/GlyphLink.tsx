import * as React from "react";
import { ImageType, useConfig } from "../config";

function getGlyphImageUrl(name: string, imageType: ImageType): string {
	let extension;
	switch (imageType) {
		case "none":
			return "";
		case "png50":
			extension = ".50px.png";
			break;
		case "svg":
			extension = ".svg";
			break;
	}
	return `https://glyphwiki.org/glyph/${name}${extension}`;
}

export interface GlyphLinkProps {
	name: string;
}

const GlyphLink = (props: GlyphLinkProps) => {
	const { name } = props;

	const [isNewpage, setIsNewpage] = React.useState(false);
	React.useEffect(() => {
		setIsNewpage(false);
	}, [name]);
	const imgOnLoad = React.useCallback((evt: React.SyntheticEvent<HTMLImageElement>) => {
		// GlyphWiki returns 100x100 red X image for glyphs that do not exist
		if (evt.currentTarget.naturalHeight === 100) {
			setIsNewpage(true);
		}
	}, []);

	const { imageType } = useConfig();

	return (
		<a
			href={`https://glyphwiki.org/wiki/${name}`}
			className={isNewpage ? "newpage" : ""}
		>
			{(imageType !== "none") && (
				<img
					className="thumb"
					src={getGlyphImageUrl(name, imageType)}
					onLoad={imgOnLoad}
					width="50" height="50"
					alt={name}
				/>
			)}
			{name}
		</a>
	);
};

export default GlyphLink;
