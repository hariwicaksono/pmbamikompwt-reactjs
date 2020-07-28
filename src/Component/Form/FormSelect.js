import React from 'react';
import { FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap';

const FormSelect = ({
  input,
  label,
  type,
  children,
  inputPlaceHolder,
  meta: { error, invalid, touched }
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <FormControl as="select"
      {...input}
      isInvalid={touched && invalid}
    >
        {children}
    </FormControl>
    {touched &&  <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
  </FormGroup>
);

export default FormSelect;
