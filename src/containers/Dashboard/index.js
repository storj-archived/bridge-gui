import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from 'redux/modules/auth';

const mapStateToProps = state => ({
  auth: {
    user     : state.auth.email,
    password : state.auth.password
  }
});

@connect(mapStateToProps, {
  logout
})

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
//TODO: Replace this method with react-router state change
    if (!this.props.user && nextProps.user) {
      // login
      //this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      //this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    //const styles = require('./Dashboard.scss');

    return (
      <nav className="navbar navbar-page">
        <div className="container">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="javascript:void(0)" className="navbar-brand">
              <img src="img/logo-blue.svg" alt="MetaDisk" className="logo">
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-left">
              <li><Link to='/buckets'>Buckets</Link></li>
              <li><Link to='/api'>API</Link></li>
              <li><Link to='/billing'>Billing</Link></li>
              <li><Link to='/support'>Support</Link></li>
            </ul>
            <div className="navbar-right">
              <a href="javascript:void(0)" onClick={this.handleLogout} className="btn btn-menu btn-transparent">Logout</a>
            </div>
          </div>

        </div>
      </nav>

      <section>
        <div className="container">
          {this.props.children}
        </div>
      </section>
    );
  }
}
