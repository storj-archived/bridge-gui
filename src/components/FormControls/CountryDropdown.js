import React from 'react';
import CountryMap from './country-map';

const CountryDropdown = (props) => {
  return (
    <select {...props}>
      {
        <option value=>The World</option>
      }
    </select>
  )
}
