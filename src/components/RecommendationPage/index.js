import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Header';
import WhiskyRecommendation from '../WhiskyRecommendation';
import Footer from '../Footer';

import css from './recommendationPage.module.css';

/*
TODO: REFACTOR PLAN:
-Move content conditionally rendered once glass button is pushed from App to here. ✅ 
-Change classes/ids to css module format. ✅ 
-Add ReactRouter code at App level to control when this component is rendered (will need to refactor away from conditional rendering/showWhisky state). ✅ 
-Set this component to receive the props it needs (from the dropdowns). ✅ 
-Relocate the fetch and assoc. logic to this level. ✅ 
-Hook up restart link.
*/

/*NOTES FROM BEN CHAT:
- set up Router component at App level with just Switch with the Route components inside (don't need the nav bar bit w/ the uls and the Link components)
- then can either wrap the button in a Link component OR (Ben's recommended way) can use the useHistory hook w/in React Router; it has access to all of the components that are a child of Router (via Route and Switch)
*/

function RecommendationPage({ apiUrl, fetchUrl, resetCriteria }) {
  //state to hold chosen whisky:
  const [whiskyResult, setWhiskyResult] = useState({});
  //state to hold flavour tags of chosen whisky:
  const [whiskyTags, setWhiskyTags] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}${fetchUrl}`)
      .then((response) => {
        console.log({ response });
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
      });
  }, [fetchUrl]);

  const history = useHistory();

  function handleTryAgain() {
    resetCriteria();
    history.push('/');
  }

  return (
    <div>
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
    </div>
  );
}

export default RecommendationPage;
