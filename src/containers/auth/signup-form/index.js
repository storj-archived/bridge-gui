import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { IndexLink, hashHistory } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';
import client from 'utils/api-client';
import signupValidation from 'containers/auth/signup-form/signup-validation';
import formLabelError from 'components/error-views/form-label-error';
import TermsOfService from 'components/copy/terms-of-service';

@reduxForm({
  form: 'Signup',
  fields: ['email', 'password', 'eula'],
  validate: signupValidation
})

export default class SignUpForm extends Component {
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

  openEula(event) {
    event.preventDefault();
    this.setState({showEula: true});
  }

  closeEula() {
    this.setState({showEula: false});
  }

  submit() {
    return new Promise((resolve, reject) => {
      client.api.createUser({
        email: this.props.fields.email.value,
        password: this.props.fields.password.value,
        redirect: 'https://app.storj.io/'
      })
        .then(
          function success() {
            resolve();
            hashHistory.push('/signup-success');
          },
          function fail(err) {
            if (err && err.message) {
              reject({_error: err.message});
            }
          });
    });
  }

  renderEula() {
    return (
      <Modal
        show={this.state.showEula}
        onHide={this.closeEula.bind(this)}
        bsSize="large"
        className="modal-scroll-body"
      >
        <Modal.Header closeButton>
          <h1 className="text-center">Storj Labs</h1>
        </Modal.Header>
        <Modal.Body>
          <TermsOfService/>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-transparent"
            onClick={this.closeEula.bind(this)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const {
      fields: {
        email,
        password,
        eula
      },
      error,
      submitFailed,
      handleSubmit
    } = this.props;

    return (
      <div className="container auth">
        {this.renderEula()}
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2
            col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content">

                  <h1 className="title text-center form-group">Sign Up</h1>
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
                        Sign Up
                      </button>
                    </div>

                    <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="text-right"
                          name="eula"
                          {...eula}
                        />
                        I agree to the
                        <a href="#noop" onClick={this.openEula.bind(this)}>
                          Terms of Service
                        </a>
                      </label>
                    </div>

                    {error && <div><span className="text-danger">{error}</span></div>}
                    {eula.error && eula.touched && <div><span className="text-danger">{eula.error}</span></div>}
                  </form>
                </div>
                <p>
                  Already have an account?
                  <IndexLink to="/" className="login">Log In</IndexLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
