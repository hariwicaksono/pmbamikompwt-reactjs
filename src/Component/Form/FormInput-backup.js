import React from 'react';
import { FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap';

const FormInput = ({
  input,
  label,
  type,
  inputPlaceHolder,
  maxDate,
  minDate,
  meta: { error, invalid, touched }
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <FormControl
      {...input}
      type={type}
      placeholder={inputPlaceHolder}
      max={maxDate}
      min={minDate}
      isInvalid={touched && invalid}
    />
    {touched &&  <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
  </FormGroup>
);

export default FormInput;
