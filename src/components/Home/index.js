import React, { useState, useEffect, lazy, Suspense } from 'react';

import { useHistory } from 'react-router-dom';

import Dropdowns from '../Dropdowns';
import GlassButton from '../GlassButton';
// import RandomFact from '../RandomFact';

import css from './home.module.css';

const RandomFact = lazy(() => import('../RandomFact'));

function Home({ apiUrl, criteriaDispatch, criteriaState, populateFetchUrl }) {
  //state to hold the fact:
  const [fact, setFact] = useState('');

  //fetches the random fact:
  useEffect(() => {
    fetch(`${apiUrl}randomfact/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const factObj = data;
        if (factObj['results'][0]['text']) {
          setFact(factObj['results'][0]['text']);
        } else {
          setFact(
            'Something went wrong when consulting the oracle for your random nugget of whisky lore. *hic!* Refresh the page again to try again.'
          );
        }
      });
  }, []);

  const history = useHistory();

  function testyTest() {
    history.push('/recommendation');
  }

  function handleGlassButtonPress() {
    populateFetchUrl();
    history.push('/recommendation');
  }

  return (
    <div>
      <h3 className={css.subhead} onClick={testyTest}>
        Muddled over malts? Boggled by barley? Simply set one or more of the
        particulars below and tap the glass for guidance.
      </h3>
      <Dropdowns
        criteriaDispatch={criteriaDispatch}
        criteriaState={criteriaState}
      />
      <GlassButton handleClick={handleGlassButtonPress} />
      <Suspense fallback={<p>Random whisky fact loading...</p>}>
        <RandomFact fact={fact} />
      </Suspense>
    </div>
  );
}

export default Home;
