import React from 'react';

const FormCheckbox = ({
  field,
  label,
  type,
  form: { touched, errors },
  ...props
}) => (

    <>
    <input {...field} {...props} type={type} label={label}  />
    
    {touched[field.name] &&
      errors[field.name] && <span class="error">{errors[field.name]}</span>}
    </>

);

export default FormCheckbox;
