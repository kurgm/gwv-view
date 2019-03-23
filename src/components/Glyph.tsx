import * as React from "react";

import {ImageType, getSettings} from "../settings";

interface GlyphProps {
	name: string;
}
interface GlyphState {
	newpage: boolean;
}

const extensions = {
	[ImageType.PNG50]: ".50px.png",
	[ImageType.SVG]: ".svg",
};

class Glyph extends React.Component<GlyphProps, GlyphState> {
	public state: Readonly<GlyphState> = {
		newpage: false,
	};
	private imageElement!: HTMLImageElement | null;

	public componentWillReceiveProps(nextProps: Readonly<GlyphProps>) {
		if (this.props.name !== nextProps.name) {
			this.setState({
				newpage: false,
			});
		}
	}

	public render() {
		const {imageType} = getSettings();
		return (
			<a
				href={`https://glyphwiki.org/wiki/${this.props.name}`}
				className={`glyphLink${this.state.newpage ? " newpage" : ""}`}>
				{imageType !== ImageType.NONE && (
					<img
						src={`https://glyphwiki.org/glyph/${this.props.name}${extensions[imageType]}`}
						width="50"
						height="50"
						alt={this.props.name}
						className="thumb"
						onLoad={this.handleLoad}
						ref={(instance) => {
							this.imageElement = instance;
						}}
					/>
				)}
				{this.props.name}
			</a>
		);
	}

	private handleLoad = () => {
		// GlyphWiki returns 100x100 red X image for glyphs that do not exist
		if (this.imageElement && this.imageElement.naturalHeight === 100) {
			this.setState({
				newpage: true,
			});
		}
	}
}

export default Glyph;
