export default function(values) {
  const errors = {};
  /*
    if(!values.name) {
      errors.name = 'required'
    }
  */
  if(!values.eula) {
    errors.eula = 'Please accept the Terms of Service to proceed.';
  }
  return errors;
};
