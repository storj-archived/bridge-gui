import * as validate from 'utils/validation';

export default function({ email, password }) {
  const errors = {};

  errors.email = validate.email(email) || validate.required(email);
  errors.password = validate.required(password);

  return errors;
}
