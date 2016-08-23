import React from 'react';

const PaymentInfoPanel = ({cardData:{merchant, lastFour}}) => {
  return (
    <div>
      <div className="well">
        <h1>Default Payment Method</h1>
        <p>{merchant}</p>
        <p>{lastFour}</p>
      </div>
    </div>
  )
}

export default PaymentInfoPanel;
