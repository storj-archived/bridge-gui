import React from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import LoginForm from './containers/Auth/LoginForm';
import SignupForm from './containers/Auth/SignupForm';
import SignupSuccess from './components/MessagePage/signupSuccess';
import PasswordReset from './containers/Auth/PasswordReset';
import ApiDocs from './components/ApiDocs';
import {
  App,
  Auth,
  EditBucket,
  NewBucket,
  Buckets,
  Dashboard,
  FileBucket,
  NotFound,
  Support
  // Billing,
  // Home,
} from 'containers';

export default (store) => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute components={{navComponent: Auth, mainComponent: LoginForm}}/>
        <Route path="/signup" components={{navComponent: Auth, mainComponent: SignupForm}}/>
        <Route path="/signup-success" components={{navComponent: Auth, mainComponent: SignupSuccess}}/>
        <Route path="/password-reset" components={{navComponent: Auth, mainComponent: PasswordReset}}/>
      </Route>
      { /* Routes requiring login */ }
      <Route path="/dashboard" component={App}>
        <IndexRoute components={{navComponent: Dashboard, mainComponent: Buckets}}/>
        <Route path="bucket/new" components={{navComponent: Dashboard, mainComponent: NewBucket}}/>
        <Route path="bucket/:bucketId" components={{navComponent: Dashboard, mainComponent: EditBucket}}/>
        <Route path="bucket/:bucketId/files" components={{navComponent: Dashboard, mainComponent: FileBucket}}/>
        {/* <Route path="billing" components={{navComponent: Dashboard, mainComponent: Billing}}/> */}
        <Route path="api-docs" components={{navComponent: Dashboard, mainComponent: ApiDocs}}/>
        <Route path="support" components={{navComponent: Dashboard, mainComponent: Support}}/>
      </Route>
      { /* Catch all malformed route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Router>
  );
};
