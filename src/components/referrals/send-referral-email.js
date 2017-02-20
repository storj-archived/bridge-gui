import React, { Component } from 'react';

export default class SendReferralEmail extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <h2>Refer by email</h2>
        <div className="content">
          <form acceptCharset="UTF-8" onSubmit={this.props.handleSubmit}>
            <p>Enter your friend's emails (separated by commas) and we'll invite them for you.
            </p>
            <div className="row">
              <div className="col-xs-12">
                <input
                  type="text"
                  className="form-control"
                  value={this.props.value}
                  onChange={this.props.handleChange}
                />

                {this.props.valid
                  ? null
                  : <span style={{ color: 'red', margin: '10px', display: 'inline-block' }}>Invalid email list!</span>
                }

                {
                  this.props.emailFailures.length
                  ? <span style={{ color: 'red', margin: '10px', display:
                    'inline-block' }}>
                      Error sending: {this.props.emailFailures}
                    </span>
                  : null
                }

                {
                  this.props.emailSuccesses.length
                  ? <span style={{ color: 'green', margin: '10px', display:
                    'inline-block' }}>
                      Success sending: {this.props.emailSuccesses}!
                    </span>
                  : null
                }
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <input
                  type="submit"
                  name="submit"
                  value="Invite friends"
                  className="btn btn-block btn-green"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SendReferralEmail.propTypes = {
  handleSubmit: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  value: React.PropTypes.string,
  valid: React.PropTypes.bool,
  emailFailures: React.PropTypes.array,
  emailSuccess: React.PropTypes.array
};
