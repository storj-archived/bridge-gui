import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import client from 'utils/api-client';
import formLabelError from 'components/error-views/form-label-error';
import loginValidation from 'containers/auth/login-form/login-validation';

@reduxForm({
  form: 'PasswordReset',
  fields: ['email', 'password'],
  validate: loginValidation
})

export default class PasswordReset extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  submit() {
    const email    = this.props.fields.email.value;
    const password = this.props.fields.password.value;
    const { protocol, host } = window.location;
    return new Promise((resolve, reject) => {
      return client.resetPassword({
        email,
        password,
        redirect: `${protocol}//${host}/#/?passwordReset`
      }).then(
        function success() {
          resolve();
          hashHistory.push('/password-reset-pending');
        },
        function fail(err) {
          if (err && err.message) {
            reject({ _error: err.message });
          }
        }
      );
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

                  <h1 className="title text-center form-group">
                    Forgot your password?
                  </h1>

                  <form>
                    <p class="form-group">Enter your email address and a new
                      password below, and we'll send you instructions on how to
                      complete your password reset.
                    </p>

                    <div className={'form-group ' + (submitFailed && email.error ? 'has-error' : '')}>
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
                        Reset My Password
                      </button>
                    </div>
                    {error && <div><span className="text-danger">{error}</span></div>}
                  </form>
                </div>
                <p>Go back to <Link to="/" className="login">Log In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
