import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import config from '../../config';

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
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
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
    console.log(this.props)
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
