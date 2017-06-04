import * as React from "react";

interface IGlyphProps {
	name: string;
}
interface IGlyphState {
	newpage: boolean;
}

class Glyph extends React.Component<IGlyphProps, IGlyphState> {
	public state: Readonly<IGlyphState> = {
		newpage: false,
	};
	private imageElement: HTMLImageElement;

	public componentWillReceiveProps(nextProps: Readonly<IGlyphProps>) {
		if (this.props.name !== nextProps.name) {
			this.setState({
				newpage: false,
			});
		}
	}

	public render() {
		return (
			<a
				href={`https://glyphwiki.org/wiki/${this.props.name}`}
				className={`glyphLink${this.state.newpage ? " newpage" : ""}`}>
				<img
					src={`https://glyphwiki.org/glyph/${this.props.name}.50px.png`}
					width="50"
					height="50"
					alt={this.props.name}
					className="thumb"
					onLoad={this.handleLoad}
					ref={(instance) => { this.imageElement = instance; }}
				/>
				{this.props.name}
			</a>
		);
	}

	private handleLoad = () => {
		// GlyphWiki returns 100x100 red X image for glyphs that do not exist
		if (this.imageElement.naturalHeight !== 50) {
			this.setState({
				newpage: true,
			});
		}
	}
}

export default Glyph;
