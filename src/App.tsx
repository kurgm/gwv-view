import * as React from "react";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const App = () => (
	<MuiThemeProvider muiTheme={getMuiTheme()}>
		<div>
		</div>
	</MuiThemeProvider>
);

export default App;
