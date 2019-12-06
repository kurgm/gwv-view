import * as React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import * as HomeDoc from "./Home.md";

const useStyles = makeStyles({
	content: {
		// margin: spacing.desktopGutter,
		margin: 24, // TODO avoid magic number
	},
});

const Home: React.FunctionComponent = () => {
	const classes = useStyles();
	return (
		<div className={classes.content}>
			<HomeDoc />
		</div>
	);
};

export default Home;
