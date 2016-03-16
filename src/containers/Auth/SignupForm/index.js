import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import client from 'utils/apiClient';
import {reduxForm} from 'redux-form';
import signupValidation from './signupValidation';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import {IndexLink} from 'react-router';
import {Link, hashHistory} from 'react-router';

@reduxForm({
  form: 'Signup',
  fields: ['email', 'password'],
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

  handleSubmit(e) {
    e.preventDefault();
    client.api.createUser(this.props.fields.email.value, this.props.fields.password.value)
      .then(function success() {
        hashHistory.push('/signup-success');
      },
      function fail(err) {
        if(err && err.message) {
          this.setState({
            signupError: err.message
          });
        }
      }.bind(this));
  }

  render() {
    const {fields: {email, password}} = this.props;

    return(
      <div className="container auth">
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content form-horizontal">

                  <h1 className="title text-center form-group">Sign Up</h1>

                  <form onSumbit={this.handleSubmit}>

                    <div className="form-group">
                      {FormLabelError(email)}
                      <input type="email" className="form-control" name="email" placeholder="Email Address" {...email} />
                    </div>

                    <div className="form-group">
                      {FormLabelError(password)}
                      <input type="password" className="form-control" name="password" placeholder="Password" {...password} />
                    </div>

                    <div className="form-group">
                      <button type="submit" onClick={this.handleSubmit.bind(this)} className='btn btn-block btn-green'>Sign Up</button>
                    </div>
                    <span className="text-danger">{this.state.signupError}</span>
                  </form>
                </div>
                <p>Already have an account? <IndexLink to="/login" className="login">Log In</IndexLink></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
