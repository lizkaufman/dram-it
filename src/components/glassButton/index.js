import React from 'react';

import css from './glassButton.module.css';

function GlassButton() {
  return (
    <img
      id={css.buttonImg}
      src="https://i.ibb.co/D7SGCTv/glass-icon.png"
      alt="empty glass logo button"
    />
  );
}

export default GlassButton;
