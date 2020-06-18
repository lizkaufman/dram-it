import React, { useEffect, useState } from 'react';

import css from './whiskyRecommendation.module.css';

import NoRecTryAgain from './NoRecTryAgain';

//TODO: move the fetch to here and then can lazy load

function WhiskyRecommendation({ whiskyResult, tags, handleTryAgain }) {
  //state to hold priceRange in £ (comes from API in $):
  const [poundsPriceRange, setPoundsPriceRange] = useState('');

  // useEffect(() => {
  //   //convert priceRange from $ to £ for display:
  //   const price = whiskyResult.price;
  //   if (price <= 40) {
  //     setPoundsPriceRange('£');
  //   } else if (price > 40 && price <= 75) {
  //     setPoundsPriceRange('££');
  //   } else if (price > 75) {
  //     setPoundsPriceRange('£££');
  //   }
  // }, [whiskyResult]);

  return (
    <>
      {whiskyResult ? (
        <div className={css.whiskyRecommendation}>
          <h4 className={css.infoSection}>{whiskyResult.title}</h4>
          <img id={css.whiskyImg} src={whiskyResult.detail_img_url} alt="" />
          <h4 className={css.infoSection} id={css.region}>
            Region: {whiskyResult.region}
          </h4>
          {/* <h4 className={css.infoSection} id={css.priceRange}>
            Price range: {poundsPriceRange}
          </h4> */}
          <div className={css.infoSection}>
            <h4 id={css.tastingNotesHeader}>Tasting notes include:</h4>
            <p id={css.tastingNotesList}>
              {tags.map((flavour, i) =>
                i < tags.length - 1 ? (
                  <span className={css.flavour} key={flavour}>
                    {flavour}
                    {', '}
                  </span>
                ) : (
                  <span className={css.flavour} key={flavour}>
                    {flavour}
                  </span>
                )
              )}
            </p>
          </div>
        </div>
      ) : (
        <NoRecTryAgain handleTryAgain={handleTryAgain} />
      )}
    </>
  );
}

export default WhiskyRecommendation;
