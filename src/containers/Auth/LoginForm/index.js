import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {Link} from 'react-router';
import {ErrorViews} from 'components';
import {reduxForm} from 'redux-form';
import loginValidation from './loginValidation'

@connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)

@reduxForm({
  form: 'primeLogin',
  fields: ['email', 'password', 'rememberUser'],
  validate: loginValidation
})

export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const {fields: {email, password, rememberUser}} = this.props;
    const styles = require('./LoginForm.scss');

    return(
      <div className="row">
        <div className="col-sm-12">
          <div className="content">
            <h1 className="title text-center">Login</h1>
            <form onSumbit={handleSubmit}>
              {ErrorViews.FormLabelError(email)}
              <input type="email" name="email" placeholder="Email Address" {...email}/>
              {ErrorViews.FormLabelError(password)}
              <input type="password" name="password" placeholder="Password" {...password}/>
              <button type="submit" className='btn btn-block btn-green'></button>
            </form>
            <div className="row">
              <div className="col-sm-6 text-left">
                <div className="checkbox">
                  <label><input type="checkbox" {...rememberUser}/> Remember Me</label>
                </div>
              </div>

              <div className="col-sm-6 text-right">
                <Link to="/password-reset">Forgot Password?</Link>
              </div>

            </div>
          </div>
          <p>Don't have an account? <Link to="/signup" className="login">Sign Up</Link></p>
        </div>
      </div>
    );
  }
}
