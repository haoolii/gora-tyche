import React from 'react';
import { Layout } from './pages';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, BaseProvider } from 'baseui';
import {createTheme} from 'baseui';
const primitives = {
  primaryFontFamily: 'UberMoveMedium',
};
const theme = createTheme(primitives);

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        <Layout />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
