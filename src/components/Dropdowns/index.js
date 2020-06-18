import React from 'react';
import css from './dropdowns.module.css';
import {
  ADD_REGION,
  ADD_PRICE_RANGE,
  ADD_FLAVOUR_MOOD,
} from '../App/actionTypes';

const flavorNames = [
  'caramel',
  'sweet',
  'spicy',
  'ginger',
  'sherry',
  'peppery',
  'floral',
  'light',
  'rich',
  'buttery',
  'balanced',
  'fruity',
  'cherry',
  'toffee',
  'orange',
  'vanilla',
  'salty',
  'bitter',
  'oak',
  'butterscotch',
  'dry',
  'herbal',
  'maple',
  'tobacco',
  'wood',
  'coffee',
  'licorice',
  'earthy',
  'smokey',
  'complex',
  'creamy',
  'mild',
  'chocolate',
  'honey',
  'raisins',
  'cinnamon',
  'pear',
  'apple',
  'nutty',
  'corn',
  'heavy',
  'lingering',
];

function Dropdowns({ criteriaDispatch, criteriaState }) {
  function handleChange(event) {
    console.log(event.target.name, event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'region':
        criteriaDispatch({ type: ADD_REGION, payload: value });
        break;
      case 'priceRange':
        criteriaDispatch({ type: ADD_PRICE_RANGE, payload: value });
        break;
      case 'flavourMood':
        criteriaDispatch({ type: ADD_FLAVOUR_MOOD, payload: value });
        break;
      default:
        return;
    }
  }

  return (
    <div id={css.dropdowns}>
      <label>
        <span className={css.dropdownLabel}>Region: </span>
        <select
          onChange={handleChange}
          className={css.dropdownSelector}
          name="region"
          value={criteriaState.region}
        >
          <option value=""></option>
          <option value="highland">Highland</option>
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
        <span className={css.dropdownLabel}>Price range: </span>
        <select
          onChange={handleChange}
          className={css.dropdownSelector}
          id={css.priceSelector}
          name="priceRange"
          value={criteriaState.priceRange}
        >
          <option value=""></option>
          <option value="$">£</option>
          <option value="$$">££</option>
          <option value="$$$">£££</option>
        </select>
      </label>

      <label>
        <span className={css.dropdownLabel}>Flavour mood: </span>
        <select
          onChange={handleChange}
          className={css.dropdownSelector}
          name="flavourMood"
          value={criteriaState.flavourMood}
        >
          <option value=""></option>
          {flavorNames.sort().map((flavor) => (
            <option value={flavor} key={flavor}>
              {flavor}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Dropdowns;
