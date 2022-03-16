import React from 'react';

import { FontsProvider } from './components/FontsContext';
import Tabs from './components/Tabs';

function App() {
  return (
    <main className="app">
      <FontsProvider>
        <Tabs />
      </FontsProvider>
    </main>
  );
}

export default App;
