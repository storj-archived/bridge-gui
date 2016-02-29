import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {reduxForm} from 'redux-form';
import signupValidation from './signupValidation';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import {IndexLink} from 'react-router';

@connect(
  state => ({
    email: state.auth.email,
    password: state.auth.password,
  }),
  dispatch => ({
    signUp: (email, password) => dispatch(authActions.signup(email, password))
  })
)

@reduxForm({
  form: 'Signup',
  fields: ['email', 'password'],
  validate: signupValidation
})

export default class SignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.props.fields.email.value, this.props.fields.password.value);
  }

  render() {
    const {fields: {email, password}} = this.props;

    return(
      <div className="container auth">
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content">
                  <h1 className="title text-center">Sign Up</h1>
                  <form onSumbit={this.handleSubmit}>
                    {FormLabelError(email)}
                    <input type="email" name="email" placeholder="Email Address" {...email} />
                    {FormLabelError(password)}
                    <input type="password" name="password" placeholder="Password" {...password} />
                    <button type="submit" onClick={this.handleSubmit.bind(this)} className='btn btn-block btn-green'>Sign Up</button>
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
