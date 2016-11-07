import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, hashHistory } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import client from 'utils/api-client';

const mapStateToProps = (state) => ({
  userEmail: state.localStorage.email
});

@connect(
  mapStateToProps
)

export default class Dashboard extends Component {
  static propTypes = {
    userEmail: PropTypes.string
  }

  handleLogout(event) {
    event.preventDefault();
    client.api
      .destroyPublicKey(client.api._options.keypair.getPublicKey())
      .then(logout, logout);

    function logout() {
      if (window && window.localStorage) {
        window.localStorage.removeItem('privkey');
        window.localStorage.removeItem('email');
      }
      client.removeKeyPair();
      hashHistory.push('/');
    }
  }

  render() {
    // Unused variables. What are they for? I don't know.
    // const email = this.props.userEmail;
    // const styles = require('./dashboard.scss');
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
            <li><IndexLink to="/dashboard">Buckets</IndexLink></li>
            <li><Link to="/dashboard/billing">Billing</Link></li>
            <li><a href="https://storj.readme.io/">Documentation</a></li>
            <li><Link to="/dashboard/api-docs">API</Link></li>
            <li><a href="https://storj.readme.io/discuss">Support</a></li>
          </ul>
          <div className="navbar-right">
            <a
              href="#noop"
              onClick={this.handleLogout.bind(this)}
              className="btn btn-menu btn-transparent"
              role="button"
            >
              Logout
            </a>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
