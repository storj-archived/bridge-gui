import React from 'react';
import countryMap from 'components/form-controls/country-map';

const CountryDropdown = (props) => {
  return (
    <select {...props}>
      {
        Object.keys(countryMap).map((value) => {
          const text = countryMap[value];
          return <option value={value} key={value}> {text} </option>;
        })
      }
    </select>
  );
};

export default CountryDropdown;
