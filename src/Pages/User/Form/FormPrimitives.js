import React from 'react';
import classnames from 'classnames';

export const Field = ({ error, id, label, className, children }) => {
  const classes = classnames(
    'form-group',
    {
      error: !!error,
    },
    className
  );
  return (
    <div className={classes}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children}
      <InputFeedback error={error} />
    </div>
  );
};

export const InputFeedback = ({ error }) =>
  error
    ? <span className="error">
        {error}
      </span>
    : null;
