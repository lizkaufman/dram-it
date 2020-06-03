import React, { useState, useReducer, useEffect, lazy, Suspense } from 'react';
import './App.css';

//import Header from '../Header';
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

//test case for lazy loading:
const Header = lazy(() => import('../Header'));

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

//TODO: use react router and make the recommendation on its own page - that way I can lazy load the recommendation component until the fetch comes through (replace cond rendering)

function App() {
  //state that manages whether the initial screen w/ dropdowns shows or the results screen:
  const [showWhisky, setShowWhisky] = useState(false);
  //state to hold the fact:
  const [fact, setFact] = useState('');
  //state to hold the fetch url:
  const [fetchUrl, setFetchUrl] = useState('');
  //state to hold chosen whisky:
  const [whiskyResult, setWhiskyResult] = useState({});
  //state that holds if search results were empty:
  const [whiskyTags, setWhiskyTags] = useState([]);
  //state to hold price for chosen whisky:
  const [price, setPrice] = useState(0);

  //useReducer that populates fetch for whisky matching criteria:
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

  useEffect(() => {
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
        pickedResult &&
          setWhiskyTags(pickedResult.tags.map((tagObj) => tagObj.title));
        pickedResult && setPrice(pickedResult.price);
      });
  }, [fetchUrl]);

  function handleGlassButtonPress() {
    //populate fetchUrl state:
    const { region, priceRange, flavourMood } = criteriaState; //✅
    console.log(criteriaState); //✅

    let addToUrl = 'shoot/?';

    if (region) {
      console.log({ region }); //✅
      // setFetchUrl(fetchUrl + `region=${region}&`);
      // console.log({ fetchUrl });
      addToUrl = addToUrl + `region=${region}&`;
      console.log({ addToUrl });
    }
    if (priceRange) {
      console.log({ priceRange }); //✅
      // setFetchUrl(fetchUrl + `price=${priceRange}&`);
      // console.log({ fetchUrl });
      addToUrl = addToUrl + `priceRange=${priceRange}&`;
      console.log({ addToUrl });
    }
    if (flavourMood) {
      console.log({ flavourMood }); //✅
      // setFetchUrl(fetchUrl + `tags=${flavourMood}&`);
      // console.log({ fetchUrl });
      addToUrl = addToUrl + `tags=${flavourMood}&`;
      console.log({ addToUrl });
    }

    setFetchUrl(addToUrl);

    setShowWhisky(true); //shows result
  }

  function handleTryAgain() {
    criteriaDispatch({ type: CLEAR }); //clears dropdowns
    setFetchUrl('shoot/?'); //clears fetchUrl
    setShowWhisky(false);
  }

  //TODO: react router!

  return (
    <div className="App">
      <Suspense fallback={<p>loading</p>}>
        <Header />
      </Suspense>

      {!showWhisky ? (
        <>
          <h3 className="subhead">
            Muddled over malts? Boggled by barley? Simply set one or more of the
            particulars below and tap the glass for guidance.
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
          <WhiskyRecommendation
            whiskyResult={whiskyResult}
            priceRange={price}
            tags={whiskyTags}
            handleTryAgain={handleTryAgain}
          />
          <h3 className="subhead" id="slainte">
            Sláinte!
          </h3>
          <h4 className="subhead" id="tryAgainMessage" onClick={handleTryAgain}>
            Not quite hitting the spot? <span id="tapHere">Tap here</span> to
            consult the whisky oracle again.
          </h4>
        </>
      )}
      <footer>
        <p id="footerText">
          Made by Liz Kaufman.{' '}
          <a
            href="https://github.com/lizkaufman"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            View Github repo here.
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
