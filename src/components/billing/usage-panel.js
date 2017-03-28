import React from 'react';
import {Link} from 'react-router';
import Currency from 'components/billing/currency';
import './usage-panel.scss';

const UsagePanel = ({ storage, bandwidth }) => {
  return (
    <div className="col-xs-12 col-sm-6">
      <h2 className="title">Usage This Month</h2>
      <div className="content">
        <div className="row">
          <div className="col-xs-6">
            <div className="">
              <h4>Storage</h4>
              <span className="mb0 blue">{storage || '0.00'}</span>
              <div
                className="text-muted unit-text"
                style={{ display: 'inline-block' }}
              >
                <div> / 25GB</div>
                <div>free</div>
              </div>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="mb0">
              <h4>Bandwidth</h4>
              <span className="mb0 blue">{bandwidth || '0.00'}</span>
              <div
                className="text-muted unit-text"
                style={{ display: 'inline-block' }}
              >
                <div> / 25GB</div>
                <div>free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsagePanel;
