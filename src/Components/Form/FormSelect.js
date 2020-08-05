import React from 'react';
import { FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap';

const FormSelect = ({
  field,
  label,
  children,
  form: { errors, touched }
}) => (
  <FormGroup>
    <FormLabel style={{fontWeight:"600"}}>{label}</FormLabel>
    <FormControl as="select"
      {...field}
      isInvalid={touched[field.name] && errors[field.name]}
    >
        {children}
    </FormControl>
    {touched[field.name] &&  <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>}
  </FormGroup>
);

export default FormSelect;
