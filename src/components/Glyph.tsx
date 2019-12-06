import * as React from "react";

import {ImageType, getSettings} from "../settings";

interface GlyphProps {
	name: string;
}

const extensions = {
	[ImageType.PNG50]: ".50px.png",
	[ImageType.SVG]: ".svg",
};

const Glyph: React.FunctionComponent<GlyphProps> = (props) => {
	const [newpage, setNewpage] = React.useState(false);
	const imageRefContainer = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {setNewpage(false);}, [props.name]);

	const handleLoad = () => {
		// GlyphWiki returns 100x100 red X image for glyphs that do not exist
		if (imageRefContainer.current && imageRefContainer.current.naturalHeight === 100) {
			setNewpage(true);
		}
	};

	const {imageType} = getSettings();
	return (
		<a
			href={`https://glyphwiki.org/wiki/${props.name}`}
			className={`glyphLink${newpage ? " newpage" : ""}`}>
			{imageType !== ImageType.NONE && (
				<img
					src={`https://glyphwiki.org/glyph/${props.name}${extensions[imageType]}`}
					width="50"
					height="50"
					alt={props.name}
					className="thumb"
					onLoad={handleLoad}
					ref={imageRefContainer}
				/>
			)}
			{props.name}
		</a>
	);
};

export default Glyph;
