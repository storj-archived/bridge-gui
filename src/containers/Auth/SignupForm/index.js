import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {reduxForm} from 'redux-form';
import {ErrorViews} from 'components';
import signupValidation from './signupValidation';

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

  handleSubmit = (e) => {
    e.preventDefault();

  }

  render() {
    const {fields: {email, password}} = this.props;
    const styles = require('./SignupForm.scss');

    return(
      <div class="row">
        <div class="col-sm-12">
          <div class="content">
            <h1 class="title text-center">Sign Up</h1>
            <form onSumbit={handleSubmit}>
              {ErrorViews.FormLabelError(email)}
              <input type="email" name="email" placeholder="Email Address" {...email} />
              {ErrorViews.FormLabelError(password)}
              <input type="password" name="password" placeholder="Password" {...password} />
              <button type="submit" className='btn btn-block btn-green'></button>
            </form>
          </div>
          <p>Already have an account? <Link to="/login" className="login">Log In</Link></p>
        </div>
      </div>
    );
  }
}
