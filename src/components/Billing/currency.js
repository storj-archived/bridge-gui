import React from 'react';

/*
 * NB: eventually we may add multiple currencies/denominations;
 * this will require conversion and switching the symbols.
 *
 * This may likely be done based on locale.
 */

const Currency = ({amount}) => {
  const value = (typeof(amount) !== 'number') ?
    '' : (amount / 100).toFixed(6);

  return (
    <span>${value}</span>
  );
};

export default Currency;
