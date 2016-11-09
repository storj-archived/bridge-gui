import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import client from 'utils/api-client';
import formLabelError from 'components/error-views/form-label-error';
import loginValidation from 'containers/auth/login-form/login-validation';
import { storeEmail } from 'redux/modules/local-storage';

const mapDispatchToProps = {
  storeEmail
};

@connect(null, mapDispatchToProps)

@reduxForm({
  form: 'primeLogin',
  fields: ['email', 'password', 'rememberUser'],
  validate: loginValidation
})

export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    storeEmail: PropTypes.func,
    location: PropTypes.shape({
      query: PropTypes.object
    })
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const privkey = window.localStorage.getItem('privkey');
    if (privkey) {
      client.api
        .getPublicKeys()
        .then(function success() {
          hashHistory.push('/dashboard');
        });
    }
  }

  header() {
    const {
      location: {
        query: {
          passwordReset
        }
      }
    } = this.props;

    if (typeof(passwordReset) === 'undefined') {
      return <h1 className="title text-center form-group">Login</h1>;
    }

    return (
      <div>
        <h1 className="title text-center form-group">Success</h1>
        <p>Your password has been successfully changed. Please log in.</p>
      </div>
    );
  }

  submit() {
    return new Promise((resolve, reject) => {
      const keypair = client.createKeyPair();
      const email = this.props.fields.email.value;
      const password = this.props.fields.password.value;

      client.useBasicAuth(email, password);

      if (window && window.localStorage) {
        this.props.storeEmail(email);
      }

      client.api
        .addPublicKey(keypair.getPublicKey())
        .then(function success() {
          client.removeBasicAuth();
          if (window && window.localStorage) {
            window.localStorage.setItem('privkey', keypair.getPrivateKey());
          }
          client.useKeyPair(keypair);
          resolve();
          hashHistory.push('/dashboard');
        },
        function fail(err) {
          if (err && err.message) {
            reject({_error: err.message});
          }
        });
    });
  }

  render() {
    const {
      fields: {
        email,
        password
      },
      error,
      handleSubmit,
      submitFailed
    } = this.props;

    return (
      <div className="container auth">
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content">

                  {this.header()}

                  <form>
                    <div className={`
                        form-group
                        ${submitFailed && email.error ? 'has-error' : ''}
                      `}
                    >
                      {submitFailed && formLabelError(email)}
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        {...email}
                      />
                    </div>

                    <div className={`
                        form-group
                        ${submitFailed && password.error ? 'has-error' : ''}
                      `}
                    >
                      {submitFailed && formLabelError(password)}
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        {...password}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        onClick={handleSubmit(this.submit.bind(this))}
                        className="btn btn-block btn-green"
                      >
                        Login
                      </button>
                    </div>
                    {error && <div><span className="text-danger">{error}</span></div>}
                  </form>
                  <div className="row">
                    {/*
                     <div className="col-sm-6 text-left">
                     <div className="checkbox">
                     <label><input type="checkbox" {...rememberUser}/> Remember Me</label>
                     </div>
                     </div>
                     */}
                    <div className="col-sm-6 text-right pull-right">
                      <Link to="/password-reset" className="forgot-password">
                        Forgot Password?
                      </Link>
                    </div>

                  </div>
                </div>
                <p>
                  Don't have an account?
                  <Link to="/signup" className="login">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
