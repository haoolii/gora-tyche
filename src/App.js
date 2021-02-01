import React from 'react';
import { Layout } from './pages';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider } from 'baseui';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Layout />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
