import React, { useState, useReducer } from 'react';
import './App.css';

import Header from '../Header';
import Dropdowns from '../Dropdowns';
import GlassButton from '../glassButton';
import RandomFact from '../RandomFact';

import { ADD_REGION, ADD_PRICE_RANGE, ADD_FLAVOUR_MOOD } from './actionTypes';

//TODO: need a screen for if the selection doesn't result in anything (i.e. they select specifics from all 3 categories and there isn't a match that meets the 3 characteristics); can have a tip to start broader, maybe with region and price or just flavor

const apiUrl = 'https://evening-citadel-85778.herokuapp.com/';

//initial state for fetchCriteria reducer
const initialFetchCriteriaState = 'shoot/?';

export function fetchCriteriaReducer(fetchCriteriaState, action) {
  const { type } = action;
  switch (type) {
    case ADD_REGION:
      //add region=x&
      return;
    case ADD_PRICE_RANGE:
      //add price=x&
      return;
    case ADD_FLAVOUR_MOOD:
      //add
      return;
    default:
      return fetchCriteriaState;
  }
}

function App() {
  //state that manages whether the initial screen w/ dropdowns shows or the results screen:
  const [showWhisky, setShowWhisky] = useState(true);

  //reducer that populates fetch for whisky matching criteria:
  const [fetchCriteriaState, dispatch] = useReducer(
    fetchCriteriaReducer,
    initialFetchCriteriaState
  );

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
