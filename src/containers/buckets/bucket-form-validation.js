import * as validate from 'utils/validation';

export default function({ name }) {
  const errors = {};

  errors.name = validate.required(name);

  return errors;
}
