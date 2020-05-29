import React from 'react';
import './App.css';

import Header from '../Header';
import Dropdowns from '../Dropdowns';
import GlassButton from '../glassButton';
import RandomFact from '../RandomFact';

function App() {
  return (
    <div className="App">
      <Header />
      <h3 class="subhead">
        Muddled over malts? Boggled by barley? Simply set one or more of the
        particulars below and tap the glass for whisky wisdom.
      </h3>
      <Dropdowns />
      <GlassButton />
      <RandomFact />
    </div>
  );
}

export default App;
