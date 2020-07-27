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
    {touched && <Form.Text className="error">{error}</Form.Text>}
  </FormGroup>
);

export default FormInput;
