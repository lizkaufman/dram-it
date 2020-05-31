import React, { useState, useReducer, useEffect } from 'react';
import './App.css';

import Header from '../Header';
import Dropdowns from '../Dropdowns';
import GlassButton from '../GlassButton';
import RandomFact from '../RandomFact';
import WhiskyRecommendation from '../WhiskyRecommendation';

import {
  ADD_REGION,
  ADD_PRICE_RANGE,
  ADD_FLAVOUR_MOOD,
  CLEAR,
} from './actionTypes';

//TODO: need a screen for if the selection doesn't result in anything (i.e. they select specifics from all 3 categories and there isn't a match that meets the 3 characteristics); can have a tip to start broader, maybe with region and price or just flavor
//TODO: also need an error message for if the user doesn't select anything in the dropdowns and then tries to click the glass!

const apiUrl = 'https://evening-citadel-85778.herokuapp.com/';

//initial state for fetchCriteria reducer
const initialCriteriaState = { region: '', priceRange: '', flavourMood: '' };

//reducer function that picks up the values selected for each dropdown:
function criteriaReducer(criteriaState, action) {
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
    case CLEAR:
      console.log('ADD_FLAVOUR_MOOD', { payload });
      return initialCriteriaState;
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
  //state to hold chosen whisky:
  const [whiskyResult, setWhiskyResult] = useState({});

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
        // setFetchUrl(fetchUrl + `test`); <- ✅ setFetchUrl works here... so why doesn't it work in the handleGlassPress function?
      });
  }, []);

  function handleGlassButtonPress() {
    //populate fetchUrl state:
    //FIXME: problem isolated to setFetchUrl not working in this function
    // setFetchUrl('test'); <-didn't work here either
    const { region, priceRange, flavourMood } = criteriaState; //✅
    console.log(criteriaState); //✅
    if (region) {
      console.log('button pressed', region); //✅
      setFetchUrl(fetchUrl + `region=${region}&`);
      console.log(fetchUrl);
    }
    if (priceRange) {
      console.log('button pressed', priceRange); //✅
      setFetchUrl(fetchUrl + `price=${priceRange}&`);
      console.log(fetchUrl);
    }
    if (flavourMood) {
      console.log('button pressed', flavourMood); //✅
      setFetchUrl(fetchUrl + `tags=${flavourMood}&`);
      console.log(fetchUrl);
    }
    //fetch using fetchUrl state:
    fetch(`${apiUrl}${fetchUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log({ fetchUrl });
        const pickedResult =
          data['results'][Math.floor(Math.random() * data['results'].length)];
        console.log({ pickedResult });
        setWhiskyResult(pickedResult);
      });
    //TODO: logic to pick a random one out of the results, save it to a state, and pass this state to whisky rec component

    //TODO: trigger separate messages for blank results (might need to use a state at this level and then pass it down to the whisky rec component to actualy render the messages!)
    criteriaDispatch({ type: CLEAR }); //clears dropdowns
    setFetchUrl('shoot/?'); //clears fetchUrl
    setShowWhisky(true); //shows result
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
          <WhiskyRecommendation whiskyResult={whiskyResult} />
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
