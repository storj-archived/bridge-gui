export default function(values) {
  const errors = {};

  if(!/.+@.+\..+/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if(!values.email) {
    errors.email = 'Required';
  }
/*
  if(values.password && values.password.length < 8) {
    errors.password = 'Poor password length: less than 8 characters';
  }
*/
  if(!values.password) {
    errors.password = 'Required';
  }

  if(!values.eula) {
    errors.eula = 'Please accept the Terms of Service to proceed.';
  }

  return errors;
};
