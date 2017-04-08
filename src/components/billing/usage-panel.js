import React from 'react';
import {Link} from 'react-router';
import Currency from 'components/billing/currency';
import './usage-panel.scss';

const UsagePanel = ({ storage, bandwidth }) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-6">
      <h2 className="title">Usage This Month</h2>
      <div className="content">
        <div className="row">
          <div className="col-xs-6">
            <div className="">
              <p>Storage</p>
              <h2 className="mb0 blue unit-numbers">
                <b>{storage || '0.00'}</b>
                <div className="text-muted unit-text">
                  <div> / 25GB</div>
                  <div>free</div>
                </div>
              </h2>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="mb0">
              <p>Bandwidth</p>
              <h2 className="mb0 blue">
                <b>{bandwidth || '0.00'}</b>
                <div className="text-muted unit-text">
                  <div> / 25GB</div>
                  <div>free</div>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsagePanel;
