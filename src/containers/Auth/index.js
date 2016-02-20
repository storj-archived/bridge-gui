import React, {Component, PropTypes} from 'react';

export default class Login extends Component {
  render() {
    const styles = require('./Auth.scss');

    return(
      <section>
        <div className={styles.loginPage + ' container'}>
          <div className="row">
            <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
              <div className="row text-center">
                <a href="http://www.metadisk.org">
                  <img src="img/logo-white.svg" alt="MetaDisk" className="logo" />
                </a>
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
