import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class ReferralLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <h2>Share your link</h2>
        <div className="content">
          <p>
            Copy your personal referral link and share it with your friends.
          </p>
          <div className="row">
            <div className="col-xs-12">
              <input
                type="text"
                className="form-control"
                value={this.props.referralLink}
              />
            </div>
          </div>
          <div className="row">
            <CopyToClipboard
              text={this.props.referralLink}
              onCopy={this.props.handleCopy}
            >
              <div className="col-xs-12">
                <button className="btn btn-primary btn-block">
                  Copy Link
                </button>
                {
                  this.props.copied
                  ? <span style={{ color: 'red', marginBottom: '-10px' }}>Copied!</span>
                  : null
                }
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

ReferralLink.propTypes = {
  referralLink: React.PropTypes.string,
  handleCopy: React.PropTypes.func,
  copied: React.PropTypes.bool
};
