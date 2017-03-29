import React, { Component } from 'react';

export default class NewUserBanner extends Component {
  render() {
    return (
      <div
          className="alert alert-info text-center"
          role="alert"
          dataAlertcookie="alert_new_user"
      >
        <span>
          <p><strong>New User Bonus!</strong></p>
          <p>
            Sign up now to unlock <b>one year of free
            service</b> — up to 25GB of storage and bandwidth
            every month!
          </p>
        </span>
      </div>
    )
  }
}
