import React, { useEffect, useState } from 'react';

import css from './whiskyRecommendation.module.css';

function WhiskyRecommendation({ whiskyResult, priceRange, tags }) {
  //state to hold priceRange in £ (comes from API in $):
  const [poundsPriceRange, setPoundsPriceRange] = useState('test');
  //state to hold tag array:

  useEffect(() => {
    //convert priceRange from $ to £ for display:
    setPoundsPriceRange(
      priceRange
        .split('')
        .map(($) => '£')
        .join('')
    );
  }, [whiskyResult]);

  return (
    <div id={css.whiskyRecommendation}>
      <h4 className={css.infoSection}>{whiskyResult.title}</h4>
      <img
        id={css.whiskyImg}
        src="https://www.lumaticimagery.com/img/placeholder-image-sq.png"
        alt=""
      />
      <h4 className={css.infoSection} id={css.region}>
        Region: {whiskyResult.region}
      </h4>
      <h4 className={css.infoSection} id={css.priceRange}>
        Price range: {poundsPriceRange}
      </h4>
      <div className={css.infoSection}>
        <h4 id={css.tastingNotesHeader}>Tasting notes include:</h4>
        <p id={css.tastingNotesList}>
          {tags.map((flavour) => (
            <span className={css.flavour} key={flavour}>
              {flavour}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default WhiskyRecommendation;
