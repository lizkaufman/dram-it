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
const initialCriteriaState = { region: '', priceRange: '', flavourMood: '' };

//reducer function that picks up the values selected for each dropdown:
export function criteriaReducer(criteriaState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_REGION:
      console.log('ADD_REGION', { payload });
      return { ...criteriaState, region: payload };
    case ADD_PRICE_RANGE:
      console.log('ADD_PRICE_RANGE', { payload });
      return { ...criteriaState, priceRange: payload };
    case ADD_FLAVOUR_MOOD:
      console.log('ADD_FLAVOUR_MOOD', { payload });
      return { ...criteriaState, flavourMood: payload };
    default:
      return criteriaState;
  }
}

function App() {
  //state that manages whether the initial screen w/ dropdowns shows or the results screen:
  const [showWhisky, setShowWhisky] = useState(false);

  //state to hold the fact:
  const [fact, setFact] = useState('');

  //state to hold the fetch url:
  const [fetchUrl, setFetchUrl] = useState('shoot/?');

  //reducer that populates fetch for whisky matching criteria:
  const [criteriaState, criteriaDispatch] = useReducer(
    criteriaReducer,
    initialCriteriaState
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
    //TODO: take the 1-3 bits from dropdown reducer state and add their value to the fetch url state (along w/ = and &) - will prob need if statement/switch/etc.; need to check if each one is present, and if so, add its value to the url
    //TODO: FETCH HERE!
    console.log({ criteriaState });
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
          <Dropdowns
            criteriaDispatch={criteriaDispatch}
            criteriaState={criteriaState}
          />
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
