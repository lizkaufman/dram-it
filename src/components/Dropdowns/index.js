import React from 'react';
import css from './dropdowns.module.css';

function Dropdowns() {
  return (
    <div id={css.dropdowns}>
      <label>
        <span class={css.dropdownLabel}>Region: </span>
        <select class={css.dropdownSelector}>
          <option value="highlands">Highlands</option>
          <option value="island">Island</option>
          <option value="islay">Islay</option>
          <option value="speyside">Speyside</option>
          <option value="campbeltown">Campbeltown</option>
          <option value="lowlands">Lowlands</option>
          <option value="irish">Irish</option>
          <option value="american">American</option>
          <option value="bourbon">Bourbon</option>
          <option value="rye">Rye</option>
          <option value="japan">Japanese</option>
        </select>
      </label>

      <label>
        <span class={css.dropdownLabel}>Price range: </span>
        <select class={css.dropdownSelector} id={css.priceSelector}>
          <option value="$">£</option>
          <option value="$$">££</option>
          <option value="$$$">£££</option>
        </select>
      </label>

      <label>
        <span class={css.dropdownLabel}>Flavour: </span>
        <select class={css.dropdownSelector}>
          <option value="">test</option>
        </select>
      </label>
    </div>
  );
}

export default Dropdowns;
