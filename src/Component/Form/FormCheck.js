import React from 'react';
import { FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap';

const FormCheck = ({
  input,
  label,
  type,
  meta: { error, invalid, touched }
}) => (
    <div className="form-check form-check-inline">
    <Form.Check  {...input} type={type} label={label} isInvalid={touched && invalid}  />

    {touched &&  <span className="error">{error}</span>}
</div>

);

export default FormCheck;
