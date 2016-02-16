import React from 'react';

const FormLabelError = (field) => {
  if(field.touched && field.errror) {
    return <label className="text-danger">{field.error}</label>
  }
};

export default FormLabelError;
