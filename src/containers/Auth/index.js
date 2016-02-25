import React, {Component, PropTypes} from 'react';

export default class Login extends Component {
  render() {
    const styles = require('./Auth.scss');

    return(
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
              <div className="row text-center">
                <a href="http://www.metadisk.org">
                  <img src="img/logo-blue.svg" alt="MetaDisk" className={styles.logo} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
