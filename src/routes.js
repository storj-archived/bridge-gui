import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Login,
    LoginSuccess,
    NotFound,
    Billing,
    Buckets,
    Support,
    ApiKeys
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/dashboard" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="api" component={ApiKeys}/>
        <Route path="billing" component={Billing}/>
        <Route path="buckets" component={Buckets}/>
        <Route path="support" component={Support}/>
      </Route>
      <Route path="login" component={Login}/>
      {/*
      <Route path="about" component={About}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      */}
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
