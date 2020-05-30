import React, { useState, useReducer, useEffect } from 'react';
import './App.css';

import Header from '../Header';
import Dropdowns from '../Dropdowns';
import GlassButton from '../GlassButton';
import RandomFact from '../RandomFact';
import WhiskyRecommendation from '../WhiskyRecommendation';

import { ADD_REGION, ADD_PRICE_RANGE, ADD_FLAVOUR_MOOD } from './actionTypes';

//TODO: need a screen for if the selection doesn't result in anything (i.e. they select specifics from all 3 categories and there isn't a match that meets the 3 characteristics); can have a tip to start broader, maybe with region and price or just flavor

const apiUrl = 'https://evening-citadel-85778.herokuapp.com/';

//initial state for fetchCriteria reducer
const initialFetchCriteriaState = 'shoot/?';

export function fetchCriteriaReducer(fetchCriteriaState, action) {
  //FIXME: Need to finish the action types!
  const { type } = action;
  switch (type) {
    case ADD_REGION:
      //TODO: add region=x&
      console.log('ADD_REGION');
      return;
    case ADD_PRICE_RANGE:
      //TODO: add price=x&
      console.log('ADD_PRICE_RANGE');
      return;
    case ADD_FLAVOUR_MOOD:
      //TODO: add tags=x&
      console.log('ADD_FLAVOUR_MOOD');
      return;
    default:
      return fetchCriteriaState;
  }
}

function App() {
  //state that manages whether the initial screen w/ dropdowns shows or the results screen:
  const [showWhisky, setShowWhisky] = useState(false);

  //state to hold the fact:
  const [fact, setFact] = useState('');

  //reducer that populates fetch for whisky matching criteria:
  const [fetchCriteriaState, dispatch] = useReducer(
    fetchCriteriaReducer,
    initialFetchCriteriaState
  );

  //fetches the random fact:
  useEffect(() => {
    fetch(`${apiUrl}randomfact/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const factObj = data;
        setFact(factObj['results'][0]['text']);
      });
  }, []);

  function handleGlassButtonPress() {
    //TODO: FETCH HERE!
    setShowWhisky(true);
  }

  function handleTryAgain() {
    //TODO: reset dropdowns state too
    setShowWhisky(false);
  }

  return (
    <div className="App">
      <Header />
      {!showWhisky ? (
        <>
          <h3 className="subhead">
            Muddled over malts? Boggled by barley? Simply set one or more of the
            particulars below and tap the glass for whisky wisdom.
          </h3>
          <Dropdowns />
          <GlassButton handleClick={handleGlassButtonPress} />
          <RandomFact fact={fact} />
        </>
      ) : (
        <>
          <h3 className="subhead">
            Our slightly swaying sages have pondered your request and suggest:
          </h3>
          <WhiskyRecommendation />
          <h3 className="subhead" id="slainte">
            Sláinte!
          </h3>
          <h4 className="subhead" id="tryAgainMessage" onClick={handleTryAgain}>
            Not quite hitting the spot? Tap here to consult the whisky oracle
            again.
          </h4>
        </>
      )}
    </div>
  );
}

export default App;
