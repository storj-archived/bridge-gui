import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import client from 'utils/apiClient';
import {reduxForm} from 'redux-form';
import signupValidation from './signupValidation';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import {IndexLink} from 'react-router';
import {Link, hashHistory} from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';

@reduxForm({
  form: 'Signup',
  fields: ['email', 'password', 'eula'],
  validate: signupValidation
})

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  openEula(e) {
    e.preventDefault();
    this.setState({showEula: true})
  }

  closeEula(e) {
    this.setState({showEula: false})
  }

  submit(e) {
    return new Promise((resolve, reject) => {
      client.api.createUser(this.props.fields.email.value, this.props.fields.password.value, 'https://app.storj.io/')
        .then(function success() {
          resolve();
          hashHistory.push('/signup-success');
        },
        function fail(err) {
          if(err && err.message) {
            reject({_error: err.message});
          }
        });
    });
  }

  render() {
    const {fields: {email, password, eula}, error, submitFailed, handleSubmit} = this.props;

    return(
      <div className="container auth">
        {this.renderEula()}
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content form-horizontal">

                  <h1 className="title text-center form-group">Sign Up</h1>

                  <form>

                    <div className={"form-group " + (submitFailed && email.error ? "has-error" : "")}>
                      {submitFailed && FormLabelError(email)}
                      <input type="email" className="form-control" name="email" placeholder="Email Address" {...email} />
                    </div>

                    <div className={"form-group " + (submitFailed && password.error ? "has-error" : "")}>
                      {submitFailed && FormLabelError(password)}
                      <input type="password" className="form-control" name="password" placeholder="Password" {...password} />
                    </div>

                    <div className="form-group">
                      <button type="submit" onClick={handleSubmit(this.submit.bind(this))} className='btn btn-block btn-green'>Sign Up</button>
                    </div>

                    <div className="form-group checkbox">
                      <label><input type="checkbox" className="text-right" name="eula" {...eula} />I agree to the <a href="#noop" onClick={this.openEula.bind(this)}>Terms of Service</a></label>
                    </div>

                    {error && <div><span className="text-danger">{error}</span></div>}
                    {eula.error && eula.touched && <div><span className="text-danger">{eula.error}</span></div>}
                  </form>
                </div>
                <p>Already have an account? <IndexLink to="/" className="login">Log In</IndexLink></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderEula() {
    return (
      <Modal show={this.state.showEula} onHide={this.closeEula.bind(this)}>
        <Modal.Header closeButton><h3>Terms of Service</h3></Modal.Header>
        <Modal.Body>
          <p>This software is released for testing purposes only. We make no guarantees with respect to its function. By using this software you agree that Storj is not liable for any damage to your system. You also agree not to upload illegal content, content that infringes on other's IP, or information that would be protected by HIPAA, FERPA, or any similar standard. Generally speaking, you agree to test the software responsibly. We'd love to hear feedback too.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-transparent" onClick={this.closeEula.bind(this)}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
