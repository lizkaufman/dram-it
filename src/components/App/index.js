import React, { useState } from 'react';
import './App.css';

import Header from '../Header';
import Dropdowns from '../Dropdowns';
import GlassButton from '../glassButton';
import RandomFact from '../RandomFact';

//TODO: need a screen for if the selection doesn't result in anything (i.e. they select specifics from all 3 categories and there isn't a match that meets the 3 characteristics); can have a tip to start broader, maybe with region and price or just flavor

function App() {
  const [showWhisky, setShowWhisky] = useState(true);

  return (
    <div className="App">
      <Header />
      {!showWhisky ? (
        <>
          <h3 class="subhead">
            Muddled over malts? Boggled by barley? Simply set one or more of the
            particulars below and tap the glass for whisky wisdom.
          </h3>
          <Dropdowns />
          <GlassButton />
          <RandomFact />
        </>
      ) : (
        <>
          <h3 class="subhead">
            Our slightly swaying sages have pondered your request and suggest:
          </h3>

          <h3 class="subhead" id="slainte">
            Sláinte!
          </h3>
          <h4 class="subhead" id="tryAgainMessage">
            Not quite hitting the spot? Tap here to consult the whisky oracle
            again.
          </h4>
        </>
      )}
    </div>
  );
}

export default App;
