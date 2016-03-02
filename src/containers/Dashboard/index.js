import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link, IndexLink, hashHistory} from 'react-router';
import { logout } from 'redux/modules/auth';
import Navbar from 'react-bootstrap/lib/Navbar';

@connect(
  state => ({
    email: state.auth.email,
    password: state.auth.password,
    loggedIn: state.auth.loggedIn
  }),
  dispatch => ({
    logout: () => dispatch(authActions.logout())
  })
)

export default class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./Dashboard.scss');
    return (
      <Navbar className="navbar-default">
        <Navbar.Header>

          <Navbar.Toggle>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </Navbar.Toggle>

          <Navbar.Brand>
            <a href="javascript:void(0)" className="navbar-brand">
              <img src="img/logo-blue.svg" alt="MetaDisk" className="logo"/>
            </a>
          </Navbar.Brand>

        </Navbar.Header>

        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-left">
            <li><IndexLink to='/dashboard'>Buckets</IndexLink></li>
            <li><Link to='/dashboard/api'>API</Link></li>
            <li><Link to='/dashboard/billing'>Billing</Link></li>
            <li><Link to='/dashboard/support'>Support</Link></li>
          </ul>
          <a href="javascript:void(0)" onClick={this.handleLogout.bind(this)} className="btn navbar-btn btn-transparent navbar-right">Logout</a>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}
