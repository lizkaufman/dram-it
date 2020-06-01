import React from 'react';

import css from '../whiskyRecommendation.module.css';

function NoRecTryAgain({ handleTryAgain }) {
  return (
    <div className={css.whiskyRecommendation} onClick={handleTryAgain}>
      <h4 className={css.infoSection}>
        Hmm... You've stumped our sozzled sages. Perhaps you were too specific,
        or maybe they're too far into their cups. Tap here to go back and try
        again.
      </h4>
      <h4 className={css.infoSection}>
        Tip: Try using fewer criteria, such as just region and price range or
        just flavour mood.
      </h4>
    </div>
  );
}

export default NoRecTryAgain;
