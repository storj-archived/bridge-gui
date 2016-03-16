import React from 'react';

const SignupSuccess = (props) => {
  return (
    <div className="container auth">
      <div className="row">
        <div className="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12 text-center">
          <div className="row">
            <div className="col-sm-12">
              <div className="content form-horizontal">
                <h1 className="title text-center form-group">Success!</h1>
                <div className="row">
                  <p className="text-left">Thanks for signing up! We'll soon send a confirmation email. Please follow the activation link to begin using MetaDisk.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
