import * as React from "react";

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

	return (
		<a
			href={`https://glyphwiki.org/wiki/${name}`}
			className={isNewpage ? "newpage" : ""}
		>
			<img
				className="thumb"
				src={`https://glyphwiki.org/glyph/${name}.50px.png`}
				onLoad={imgOnLoad}
				width="50" height="50"
				alt={name} />
			{name}
		</a>
	);
};

export default GlyphLink;
