import React from 'react';
import css from './header.module.css';

function Header() {
  return (
    <div id={css.header}>
      <img
        id={css.headerImg}
        src="https://i.ibb.co/zxcDVHM/glass-icon-yellow.png"
        alt="empty whisky glass logo"
      />
      <h1 id={css.headerText}>Dram It!</h1>
    </div>
  );
}

export default Header;
