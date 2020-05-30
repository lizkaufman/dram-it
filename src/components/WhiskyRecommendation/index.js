import React from 'react';

import css from './whiskyRecommendation.module.css';

function WhiskyRecommendation() {
  return (
    <div id={css.whiskyRecommendation}>
      <h4>Whisky Name</h4>
      <img
        id={css.whiskyImg}
        src="https://www.lumaticimagery.com/img/placeholder-image-sq.png"
        alt=""
      />
      <h4 id={css.region}>Region: region</h4>
      <h4 id={css.priceRange}>Price range: ££</h4>
      <h4 id={css.tastingNotesHeader}>Tasting notes include:</h4>
      <p id={css.tastingNotesList}>
        lorem, ipsum, lorem, ipsum, lorem, ipsum, lorem, ipsum, lorem
      </p>
    </div>
  );
}

export default WhiskyRecommendation;
