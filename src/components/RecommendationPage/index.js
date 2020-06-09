import React from 'react';

import Header from '../Header';
import WhiskyRecommendation from '../WhiskyRecommendation';
import Footer from '../Footer';

import css from './recommendationPage.module.css';

/*
TODO: REFACTOR PLAN:
-Move content conditionally rendered once glass button is pushed from App to here. ✅ 
-Change classes/ids to css module format. ✅ 
-Add ReactRouter code at App level to control when this component is rendered (will need to refactor conditional rendering/showWhisky state).
-Set this component to receive the props it needs (from the dropdowns).
-Relocate the fetch and assoc. logic to this level.
-Hook up restart link.
*/

function RecommendationPage() {
  return (
    <div>
      <Header />
      <h3 className={css.subhead}>
        Our slightly swaying sages have pondered your request and suggest:
      </h3>
      <WhiskyRecommendation
        whiskyResult={whiskyResult}
        tags={whiskyTags}
        handleTryAgain={handleTryAgain}
      />
      <h3 className={css.subhead} id={css.slainte}>
        Sláinte!
      </h3>
      <h4
        className={css.subhead}
        id={css.tryAgainMessage}
        onClick={handleTryAgain}
      >
        Not quite hitting the spot? <span id={css.tapHere}>Tap here</span> to
        consult the whisky oracle again.
      </h4>
      <Footer />
    </div>
  );
}

export default RecommendationPage;
