import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link, IndexLink, hashHistory} from 'react-router';
import client from 'utils/apiClient';
import Navbar from 'react-bootstrap/lib/Navbar';

@connect(
  null,
  dispatch => ({
    logout: (pubkey) => dispatch(authActions.logout(pubkey))
  })
)

export default class Dashboard extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  handleLogout(e) {
    e.preventDefault();
    client.api.destroyPublicKey(client.api._options.keypair.getPublicKey())
      .then(logout, logout)

    function logout(){
      if(window && window.localStorage) {
        window.localStorage.removeItem('privkey');
      }
      client.removeKeyPair();
      hashHistory.push('/');
    }
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
            <a href="/" className="navbar-brand">
              <img src="img/logo-blue.svg" alt="Storj" className="logo"/>
            </a>
          </Navbar.Brand>

        </Navbar.Header>

        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-left">
            <li><IndexLink to='/dashboard'>Buckets</IndexLink></li>
            <li><a href='https://storj.readme.io/'>Docs</a></li>
            <li><Link to='/dashboard/api-docs'>API</Link></li>
          </ul>
          <div className="navbar-right">
            <a href="#noop" onClick={this.handleLogout.bind(this)} className="btn btn-menu btn-transparent" role="button">Logout</a>
          </div>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}
