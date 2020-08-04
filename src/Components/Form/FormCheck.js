import React from 'react';
import {  Form, FormControl } from 'react-bootstrap';

const FormCheckbox = ({
  field,
  label,
  type,
  form: { touched, errors },
  ...props
}) => (

    <div className="form-check form-check-inline">
    <Form.Check {...field} {...props} type={type} label={label} isInvalid={touched[field.name] && errors[field.name]}  />
    
    {touched[field.name] &&
      errors[field.name] && <FormControl.Feedback type="invalid">{errors[field.name]}</FormControl.Feedback>}
    </div>

);

export default FormCheckbox;
