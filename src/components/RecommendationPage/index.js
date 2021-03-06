import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import css from './recommendationPage.module.css';

const WhiskyRecommendation = lazy(() => import('../WhiskyRecommendation'));

function RecommendationPage({ apiUrl, fetchUrl, resetCriteria }) {
  //state to hold chosen whisky:
  const [whiskyResult, setWhiskyResult] = useState({});
  //state to hold flavour tags of chosen whisky:
  const [whiskyTags, setWhiskyTags] = useState([]);

  useEffect(() => {
    console.log({ combinedUrl: `${apiUrl}${fetchUrl}` });
    fetch(`${apiUrl}${fetchUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pickedResult =
          data['results'][Math.floor(Math.random() * data['results'].length)];
        console.log({ pickedResult });
        setWhiskyResult(pickedResult);
        pickedResult &&
          setWhiskyTags(pickedResult.tags.map((tagObj) => tagObj.title));
      });
  }, [apiUrl, fetchUrl]);

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
      <Suspense fallback={<p>Your next dream dram is loading...</p>}>
        <WhiskyRecommendation
          whiskyResult={whiskyResult}
          tags={whiskyTags}
          handleTryAgain={handleTryAgain}
        />
      </Suspense>
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
