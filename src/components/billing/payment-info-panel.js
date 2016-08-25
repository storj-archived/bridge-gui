import React from 'react';

const PaymentInfoPanel = ({paymentInfo: {merchant, lastFour}}) => {
  return (
    <div>
      <h2 className="title">Default Payment Method</h2>
      <div className="content">
        <div className="row">
          <div className="col-xs-6">
            <p className="text-muted">Merchant</p>
            <h2>{merchant}</h2>
          </div>
          <div className="col-xs-6 text-right">
            <p className="text-muted">Card Number</p>
            <h2>**** **** **** {lastFour}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoPanel;
