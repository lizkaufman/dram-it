import React, { useState, useReducer, useEffect, lazy, Suspense } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import Home from '../Home';
import RecommendationPage from '../RandomFact';
import Footer from '../Footer';

import {
  ADD_REGION,
  ADD_PRICE_RANGE,
  ADD_FLAVOUR_MOOD,
  CLEAR,
} from './actionTypes';

//test case for lazy loading:
const Header = lazy(() => import('../Header'));

//TODO: also need an error message for if the user doesn't select anything in the dropdowns and then tries to click the glass!

//FIXME: still bug with the price not coming through correctly! UPDATE: now fetch is pretty much completely busted...... Arg. Darn gremlins.

const apiUrl = 'https://evening-citadel-85778.herokuapp.com/';

//initial state for fetchCriteria reducer
const initialCriteriaState = {
  region: '',
  priceRange: '',
  flavourMood: '',
};

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
  //state to hold the fetch url:
  const [fetchUrl, setFetchUrl] = useState('');

  //useReducer that populates fetch for whisky matching criteria:
  const [criteriaState, criteriaDispatch] = useReducer(
    criteriaReducer,
    initialCriteriaState
  );

  let history = useHistory();

  function handleGlassButtonPress() {
    //populate fetchUrl state:
    const { region, priceRange, flavourMood } = criteriaState;
    console.log(criteriaState);

    let addToUrl = 'shoot/?';

    if (region) {
      console.log({ region });
      addToUrl = addToUrl + `region=${region}&`;
      console.log({ addToUrl });
    }
    if (priceRange) {
      console.log({ priceRange });
      addToUrl = addToUrl + `priceRange=${priceRange}&`;
      console.log({ addToUrl });
    }
    if (flavourMood) {
      console.log({ flavourMood });
      addToUrl = addToUrl + `tags=${flavourMood}&`;
      console.log({ addToUrl });
    }

    setFetchUrl(addToUrl);

    history.push('/recommendation');
  }

  function handleTryAgain() {
    criteriaDispatch({ type: CLEAR }); //clears dropdowns
    setFetchUrl('shoot/?'); //clears fetchUrl
    history.push('/');
  }

  return (
    <div className="App">
      <Suspense fallback={<p>loading</p>}>
        <Header />
      </Suspense>

      <Router>
        <Switch>
          <Route path="/">
            <Home
              apiUrl={apiUrl}
              criteriaDispatch={criteriaDispatch}
              criteriaState={criteriaState}
              handleGlassButtonPress={handleGlassButtonPress}
            />
          </Route>
          <Route path="/recommendation">
            <RecommendationPage
              apiUrl={apiUrl}
              fetchUrl={fetchUrl}
              handleTryAgain={handleTryAgain}
            />
          </Route>
        </Switch>
      </Router>

      {/* <>
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
      </> */}
      <Footer />
    </div>
  );
}

export default App;
