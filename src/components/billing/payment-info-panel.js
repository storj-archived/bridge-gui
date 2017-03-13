import React from 'react';

const PaymentInfoPanel = ({
  removingCard,
  removeCardHandler,
  paymentInfo: {merchant, lastFour}
}) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="title">Default Payment Method</h2>
            <div className="content">
              <div className="row">
                <div className="col-xs-4">
                  <p className="text-muted">Merchant</p>
                  <h2>{merchant}</h2>
                </div>
                <div className="col-xs-4">
                  <p className="text-muted">Card Number</p>
                  <h2>**** **** **** {lastFour}</h2>
                </div>
                <div className="col-xs-4 text-right">
                  <button
                    disabled={removingCard}
                    onClick={removeCardHandler}
                    className="btn btn-action btn-red"
                    type="submit"
                  >
                    {removingCard ? 'Submitting . . .' : 'Remove Card'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfoPanel;
