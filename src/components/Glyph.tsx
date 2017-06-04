import * as React from "react";

class Glyph extends React.Component<{ name: string }, {}> {
	public render() {
		// FIXME: should do lazy loading
		return (
			<a href={`https://glyphwiki.org/wiki/${this.props.name}`} className="glyphLink">
				<img
					src={`https://glyphwiki.org/glyph/${this.props.name}.50px.png`}
					width="50"
					height="50"
					alt={this.props.name}
					className="thumb"
				/>
				{this.props.name}
			</a>
		);
	}
}

export default Glyph;
