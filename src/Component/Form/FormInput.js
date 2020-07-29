import React from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';

const FormInput = ({
  field,
  label,
  type, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <FormControl type={type} {...field} {...props} isInvalid={touched[field.name] && errors[field.name]} />
    {touched[field.name] &&
      errors[field.name] && <FormControl.Feedback type="invalid">{errors[field.name]}</FormControl.Feedback>}
  </FormGroup>
);

export default FormInput;
