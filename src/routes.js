import React from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import LoginForm from './containers/Auth/LoginForm';
import SignupForm from './containers/Auth/SignupForm';
import {
    ApiKeys,
    App,
    Auth,
    Billing,
    Buckets,
    Home,
    NotFound,
    Support
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, '/login');
      }
      cb();
  };

  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={Auth}>
          <IndexRoute component={LoginForm}/>
          <Route path="/signup" component={SignupForm}/>
        </Route>
        { /* Routes requiring login */ }
        <Route path="/dashboard" onEnter={requireLogin}>
          <IndexRoute component={Home}/>
          <Route path="api" component={ApiKeys}/>
          <Route path="billing" component={Billing}/>
          <Route path="buckets" component={Buckets}/>
          <Route path="support" component={Support}/>
        </Route>
        { /* Catch all malformed route */ }
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Router>
  );
};
