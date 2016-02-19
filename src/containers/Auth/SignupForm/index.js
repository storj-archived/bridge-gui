import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {reduxForm} from 'redux-form';
import signupValidation from './signupValidation';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import {Link} from 'react-router';

@connect(
  state => ({user: state.auth.user}),
  authActions)

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
  }

  render() {
    const {fields: {email, password}} = this.props;
    const styles = require('./SignupForm.scss');

    return(
      <div className="row">
        <div className="col-sm-12">
          <div className="content">
            <h1 className="title text-center">Sign Up</h1>
            <form onSumbit={this.handleSubmit}>
              {FormLabelError(email)}
              <input type="email" name="email" placeholder="Email Address" {...email} />
              {FormLabelError(password)}
              <input type="password" name="password" placeholder="Password" {...password} />
              <button type="submit" className='btn btn-block btn-green'>Sign Up</button>
            </form>
          </div>
          <p>Already have an account? <Link to="/" className="login">Log In</Link></p>
        </div>
      </div>
    );
  }
}
