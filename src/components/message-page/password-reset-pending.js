import React from 'react';
import MessagePage from 'components/message-page';

const PasswordResetPending = () => {
  return (
    <MessagePage
      title   = "Password Reset Pending"
      message = {
        `Almost done! We just sent you a confirmation email.
        Please follow the instructions to complete your password reset.`
      }
    />
  );
};

export default PasswordResetPending;
