import React, { useState, useEffect, lazy, Suspense } from 'react';

import Dropdowns from '../Dropdowns';
import GlassButton from '../GlassButton';
// import RandomFact from '../RandomFact';

import css from './home.module.css';

const RandomFact = lazy(() => import('../RandomFact'));

function Home({
  apiUrl,
  criteriaDispatch,
  criteriaState,
  handleGlassButtonPress,
}) {
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
          setFact('Empty fact');
        }
      });
  }, []);

  return (
    <div>
      <h3 className={css.subhead}>
        Muddled over malts? Boggled by barley? Simply set one or more of the
        particulars below and tap the glass for guidance.
      </h3>
      <Dropdowns
        criteriaDispatch={criteriaDispatch}
        criteriaState={criteriaState}
      />
      <GlassButton handleClick={handleGlassButtonPress} />
      {/* <RandomFact fact={fact} /> */}
      <Suspense fallback={<p>Random whisky fact loading...</p>}>
        <RandomFact fact={fact} />
      </Suspense>
    </div>
  );
}

export default Home;
