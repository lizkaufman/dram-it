import React from 'react';
import './App.css';

import Header from '../Header';
import RandomFact from '../RandomFact';

function App() {
  return (
    <div className="App">
      <Header />
      <h3 class="subhead">
        Muddled over malts? Boggled by barley? Simply set your particulars below
        and tap the glass for whisky wisdom.
      </h3>
      <RandomFact />
    </div>
  );
}

export default App;
