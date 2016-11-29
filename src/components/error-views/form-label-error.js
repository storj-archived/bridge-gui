import React from 'react';

const FormLabelError = (field) => {
  if (field.touched && field.error) {
    return <label className="text-danger"> {field.error} </label>;
  }
};

export default FormLabelError;
