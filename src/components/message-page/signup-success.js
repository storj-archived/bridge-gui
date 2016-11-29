import React from 'react';
import MessagePage from 'components/message-page';

const SignupSuccess = () => {
  return (
    <MessagePage
      title   = "Success!"
      message = {
        `Thanks for signing up! We'll soon send a confirmation email.
        Please follow the activation link to begin using Storj.`
      }
    />
  );
};

export default SignupSuccess;
