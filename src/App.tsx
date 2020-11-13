import * as React from "react";
import { Admin } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

const dataProvider = fakeDataProvider({});

const App = () => <Admin dataProvider={dataProvider} />;

export default App;
