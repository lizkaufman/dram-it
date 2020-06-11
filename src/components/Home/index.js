import React from 'react';

import Dropdowns from '../Dropdowns';
import GlassButton from '../GlassButton';
import RandomFact from '../RandomFact';

import css from './home.module.css';

function Home() {
  return (
    <div>
      <h3 className={css.subhead}>
        Muddled over malts? Boggled by barley? Simply set one or more of the
        particulars below and tap the glass for guidance.
      </h3>
      <Dropdowns
        criteriaDispatch={criteriaDispatch}
        criteriaState={criteriaState}
      />
      <GlassButton handleClick={handleGlassButtonPress} />
      <RandomFact fact={fact} />
    </div>
  );
}

export default Home;
