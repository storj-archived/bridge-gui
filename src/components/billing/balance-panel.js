import React from 'react';

const BalancePanel = ({amount, addCreditHandler}) => {
  return (
    <div>
      <h2 className="title">Your Balance</h2>
      <div className="content">
        <div className="row">
          <div className="col-xs-6">
            <p className="text-muted">Current Balance</p>
            <h2 className="mb0 blue"><b>{amount}</b></h2>
          </div>
          <div className="col-xs-6 text-right">
            <button onClick={addCreditHandler} className="btn btn-green btn-action" >Pay Balance</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePanel;
