import React from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import LoginForm from './containers/Auth/LoginForm';
import SignupForm from './containers/Auth/SignupForm';
import {
    App,
    Auth,
    Billing,
    BucketEdit,
    BucketNew,
    Buckets,
    Dashboard,
    Home,
    NotFound,
    Support
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
      const { auth: { email, password }} = store.getState();
      if (!auth.email || !auth.password) {
        replaceState(null, '/login');
      }
      cb();
  };

  return (
    <Router history={hashHistory}>
      <Route path="/login" component={App}>
        <IndexRoute components={{navComponent: Auth, mainComponent: LoginForm}}/>
        <Route path="/signup" components={{navComponent: Auth, mainComponent: SignupForm}}/>
      </Route>
        { /* Routes requiring login */ }
      <Route path="/dashboard" component={App}>
        <IndexRoute components={{navComponent: Dashboard, mainComponent: Buckets}}/>

        <Route path="bucket/new" components={{navComponent: Dashboard, mainComponent: BucketNew}}/>
        <Route path="bucket/:bucketId" components={{navComponent: Dashboard, mainComponent: BucketEdit}}/>
        <Route path="billing" components={{navComponent: Dashboard, mainComponent: Billing}}/>
        <Route path="support" components={{navComponent: Dashboard, mainComponent: Support}}/>
      </Route>
      { /* Catch all malformed route */ }
      <Route path="*" component={NotFound} status={404} />
    </Router>
  );
};
