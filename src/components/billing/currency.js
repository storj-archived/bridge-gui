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

  // Handles any 0.000000 debits
  if (modAmount.indexOf('0.000000') === 0) {
    return '0.00'
  }

  // Trims zeros if all are 6
  if (modAmount.substr(-6) === '000000') {
    const setToTwoPlaces = (amount / 100).toFixed(2);
    return setToTwoPlaces;
  }

  // Return all the decimal places if it's less than $1
  // Looks weird otherwise
  if (modAmount.indexOf('0.') === 0) {
    return modAmount;
  }

  // Otherwise, if amount is > $1, then trim the zeros
  const trimmedAmount = trimOffZeros(modAmount);

  return trimmedAmount;
}

function trimOffZeros(amount) {
  const trimmed = amount.toString().replace(/0+$/,'');

  if (trimmed.substr(-1) === '.')  {
    const addTwoZeros = trimmed.concat('00');
    return addTwoZeros;
  }

  return trimmed;
}

export default Currency;
