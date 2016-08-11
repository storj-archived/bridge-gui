import * as validate from 'utils/validation';

validate.eula = validate.createValidator({
  required: value => {
    return !!!value ? 'Please accept the Terms of Service to proceed.' : '';
  }
});

export default function({email, password, eula}) {
  const errors = {};

  errors.email = validate.email(email) || validate.required(email);
  errors.email = validate.required(email);

/*
  errors.password = validate.minLength(8)(password) || validate.required(password);
*/

  errors.password = validate.required(password);
  errors.eula = validate.eula({required: eula}).required;

  return errors;
}
