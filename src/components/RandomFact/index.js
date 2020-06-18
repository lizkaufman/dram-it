import React, { Suspense } from 'react';

import css from './randomFact.module.css';

function RandomFact({ fact }) {
  // This is petty, but whenever this random fact comes up, it bothers me that there's a typo (it's instead of its).
  if (
    fact ===
    'A bottle of whisky can be kept for 100 years without losing it’s flavor. After opening, the whisky will retain its flavor for around 5 years.'
  ) {
    fact =
      'A bottle of whisky can be kept for 100 years without losing its flavor. After opening, the whisky will retain its flavor for around five years.';
  }

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
