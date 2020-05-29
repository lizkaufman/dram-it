import React from 'react';
import css from './dropdowns.module.css';

const flavorNames = ["caramel", "sweet", "spicy", "ginger", "sherry", "peppery", "floral", "light", "rich", "buttery", "balanced", "fruity", "cherry", "toffee", "orange", "vanilla", "salty", "bitter", "oak", "butterscotch", "dry", "herbal", "maple", "tobacco", "wood", "coffee", "licorice", "earthy", "smokey", "complex", "creamy", "mild", "chocolate", "honey", "raisins", "balanced", "cinnamon", "pear", "apple", "nutty", "corn", "heavy", "lingering"]

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
        <span class={css.dropdownLabel}>Flavour mood: </span>
        <select class={css.dropdownSelector}>
            {flavorNames.sort().map((flavor)=><option value={flavor}>{flavor}</option>)}
        </select>
      </label>
    </div>
  );
}

export default Dropdowns;
