import React from 'react';

import css from './footer.module.css';

function Footer() {
  return (
    <footer>
      <p id={css.footerText}>
        Made by Liz Kaufman.{' '}
        <a
          href="https://github.com/lizkaufman"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          View Github repo here.
        </a>
      </p>
    </footer>
  );
}

export default Footer;
