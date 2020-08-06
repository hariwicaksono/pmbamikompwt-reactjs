import React from 'react';
import {  Form, FormControl } from 'react-bootstrap';

const FormCheckbox = ({
  field,
  label,
  type,
  form: { touched, errors },
  ...props
}) => (

    <>
    <Form.Check inline={true} {...field} {...props} type={type} label={label} isInvalid={touched[field.name] && errors[field.name]} />
   
    {touched[field.name] &&
      errors[field.name] && <FormControl.Feedback type="invalid">{errors[field.name]}</FormControl.Feedback>}
    </>

);

export default FormCheckbox;
