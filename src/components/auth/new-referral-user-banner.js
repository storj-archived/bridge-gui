import React, { Component } from 'react';

export default class NewReferralUserBanner extends Component {
  render() {
    return (
      <div
          className="alert alert-info text-center"
          role="alert"
          dataAlertcookie="alert_new_user_referral"
        >
          <span>
            <p><strong>Referral Bonus!</strong></p>

            <p>
              Your friend has given you <b>50GB of free storage
              and bandwidth</b> for the next three months!
            </p>
            <p>
              Plus, you'll get our new user bonus: one year
              of free service — up to 25GB of storage and
              bandwidth every month!
            </p>
          </span>
        </div>
    )
  }
}
