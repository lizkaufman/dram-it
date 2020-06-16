import React from 'react';

import { useHistory } from 'react-router-dom';

import css from './glassButton.module.css';

function GlassButton({ handleClick }) {
  const history = useHistory();

  function handleClickAndRoute() {
    history.push('/recommendation');
    handleClick();
    console.log('new handleClickAndRoute function triggered');
  }

  return (
    <img
      id={css.buttonImg}
      src="https://i.ibb.co/D7SGCTv/glass-icon.png"
      alt="empty glass logo button"
      onClick={handleClickAndRoute}
    />
  );
}

export default GlassButton;
