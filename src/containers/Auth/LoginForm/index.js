import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link, hashHistory} from 'react-router';

import './LoginForm.scss';

import * as authActions from 'redux/modules/auth';
import FormLabelError from '../../../components/ErrorViews/FormLabelError';
import loginValidation from './loginValidation'

import {reduxForm} from 'redux-form';

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

    return(
      <div className="container auth">
        <div className="row">
          <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
            <div className="row">
              <div className="col-sm-12">
                <div className="content form-horizontal">

                  <h1 className="title text-center form-group">Login</h1>

                  <form onSumbit={this.handleSubmit}>
                    <div className="form-group">
                      {FormLabelError(email)}
                      <input type="email" className="form-control" name="email" placeholder="Email Address" {...email}/>
                    </div>

                    <div className="form-group">
                      {FormLabelError(password)}
                      <input type="password" className="form-control" name="password" placeholder="Password" {...password}/>
                    </div>

                    <div className="form-group">
                      <button type="submit" onClick={this.handleSubmit.bind(this)} className='btn btn-block btn-green'>Login</button>
                    </div>

                  </form>
                  <div className="row">
                    <div className="col-sm-6 text-left">
                      <div className="checkbox">
                        <label><input type="checkbox" {...rememberUser}/> Remember Me</label>
                      </div>
                    </div>

                    <div className="col-sm-6 text-right">
                      <Link to="/password-reset" className="forgot-password">Forgot Password?</Link>
                    </div>

                  </div>
                </div>
                <p>Don't have an account? <Link to="/signup" className="login">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
