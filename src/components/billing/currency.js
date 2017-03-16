import React from 'react';

/*
 * NB: eventually we may add multiple currencies/denominations;
 * this will require conversion and switching the symbols.
 *
 * This may likely be done based on locale.
 */

const Currency = ({ amount }) => {
  const value = prettifyAmount(amount);

  return (
    <span>${value}</span>
  );
};

function prettifyAmount(amount) {
  if (typeof(amount) !== 'number') {
    return '0.00';
  }
  const modAmount = (amount / 100).toFixed(6);

  if (modAmount.indexOf('0.000000') === 0) {
    return '0.00'
  }

  return modAmount;
}

export default Currency;
