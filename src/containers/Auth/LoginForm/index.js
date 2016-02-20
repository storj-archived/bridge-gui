import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import {Link, hashHistory} from 'react-router';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import {reduxForm} from 'redux-form';
import loginValidation from './loginValidation'

@connect(
  state => ({
    email: state.auth.email,
    password: state.auth.password,
    loggedIn: state.auth.loggedIn
  }),
  dispatch => ({
    login: (email, password) => dispatch(authActions.login(email, password))
  })
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

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.loggedIn) {
      hashHistory.push('/dashboard');
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.props.fields.email.value, this.props.fields.password.value);
  }

  render() {
    const {fields: {email, password, rememberUser}} = this.props;
    const styles = require('./LoginForm.scss');

    return(
      <div className="row">
        <div className="col-sm-12">
          <div className="content">
            <h1 className="title text-center">Login</h1>
            <form onSumbit={this.handleSubmit}>
              {FormLabelError(email)}
              <input type="email" name="email" placeholder="Email Address" {...email}/>
              {FormLabelError(password)}
              <input type="password" name="password" placeholder="Password" {...password}/>
              <button type="submit" onClick={this.handleSubmit.bind(this)} className='btn btn-block btn-green'>Log In</button>
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
