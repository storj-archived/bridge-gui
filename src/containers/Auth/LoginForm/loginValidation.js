export default function(values) {
  const errors = {};
  if(!/.+@.+\..+/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if(!values.email) {
    errors.email = 'Required';
  }

  if(!values.password) {
    errors.password = 'Required';
  }

  return errors;
};
