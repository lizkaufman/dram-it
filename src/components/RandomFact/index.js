import React, { Suspense } from 'react';

import css from './randomFact.module.css';

function RandomFact({ fact }) {
  return (
    <div id={css.randomFact}>
      <h4 id={css.factHeader}>Whisky wisdom:</h4>
      <Suspense fallback={<p>Random whisky fact loading...</p>}>
        <p id={css.factText}>{fact}</p>
      </Suspense>
    </div>
  );
}

export default RandomFact;
