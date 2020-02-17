// Adapted from https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker

import * as React from "react";
import * as ReactGA from "react-ga";
import { RouteComponentProps } from "react-router-dom";

export const withTracker = <P extends RouteComponentProps>(
	WrappedComponent: React.ComponentType<P>,
	options: ReactGA.FieldsObject = {},
) => {
	const trackPage = (page: string) => {
		ReactGA.set({ page, ...options });
		ReactGA.pageview(page);
	};

	const WithTrackerHoC: React.FunctionComponent<P> = (props) => {
		React.useEffect(() => {
			// HashRouter
			const page = location.pathname + "#" + props.location.pathname;
			trackPage(page);
		}, [props.location.pathname]);

		return <WrappedComponent {...props} />;
	};
	const childName = WrappedComponent.displayName || WrappedComponent.name || "Component";
	WithTrackerHoC.displayName = `withTracker(${childName})`;

	return WithTrackerHoC;
};
