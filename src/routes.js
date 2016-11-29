import React from 'react';
import {
  Router,
  IndexRoute,
  Route,
  hashHistory
} from 'react-router';
import LoginForm from 'containers/auth/login-form';
import SignupForm from 'containers/auth/signup-form';
import SignupSuccess from 'components/message-page/signup-success';
import PasswordReset from 'containers/auth/password-reset';
import PasswordResetPending from 'components/message-page/password-reset-pending';
import ApiDocs from 'components/api-docs';

import {
  App,
  Auth,
  EditBucket,
  NewBucket,
  Buckets,
  Dashboard,
  FileBucket,
  NotFound,
  Support,
  Billing
} from 'containers';

export default () => {
  return (
    <Router history={hashHistory}>
      {/* Open Routes */}
      <Route path="/" component={App}>
        <IndexRoute
          components={{ navComponent: Auth, mainComponent: LoginForm }}
        />
        <Route
          path="/signup"
          components={{ navComponent: Auth, mainComponent: SignupForm }}
        />
        <Route
          path="/signup-success"
          components={{ navComponent: Auth, mainComponent: SignupSuccess }}
        />
        <Route
          path="/password-reset"
          components={{ navComponent: Auth, mainComponent: PasswordReset }}
        />
        <Route
          path="/password-reset-pending"
          components={{ navComponent: Auth, mainComponent: PasswordResetPending}}
        />
      </Route>
      {/* Routes requiring login */}
      <Route path="/dashboard" component={App}>
        <IndexRoute
          components={{ navComponent: Dashboard, mainComponent: Buckets }}
        />
        <Route
          path="billing"
          components={{ navComponent: Dashboard, mainComponent: Billing }}
        />
        <Route
          path="bucket/new"
          components={{ navComponent: Dashboard, mainComponent: NewBucket }}
        />
        <Route
          path="bucket/:bucketId"
          components={{ navComponent: Dashboard, mainComponent: EditBucket }}
        />
        <Route
          path="bucket/:bucketId/files"
          components={{ navComponent: Dashboard, mainComponent: FileBucket }}
        />
        <Route
          path="api-docs"
          components={{ navComponent: Dashboard, mainComponent: ApiDocs }}
        />
        <Route
          path="support"
          components={{ navComponent: Dashboard, mainComponent: Support }}
        />
      </Route>
      { /* Catch all malformed route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Router>
  );
};
