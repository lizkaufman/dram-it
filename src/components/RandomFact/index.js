import React from 'react';

import css from './randomFact.module.css';

function RandomFact({ fact }) {
  return (
    <div id={css.randomFact}>
      <h4 id={css.factHeader}>Whisky wisdom:</h4>
      <p id={css.factText}>{fact}</p>
    </div>
  );
}

export default RandomFact;
