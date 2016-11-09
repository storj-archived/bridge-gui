import React, { Component } from 'react';
import 'containers/auth//auth.scss';

export default class Login extends Component {
  render() {
    return (
      <section className="auth">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2
              col-xs-12 text-center">
              <div className="row text-center">
                <a href="/">
                  <img src="img/logo-blue.svg" alt="Storj" className="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
