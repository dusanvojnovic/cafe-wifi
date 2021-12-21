import { useField } from 'formik';

import classes from './Input.module.css';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={classes.textInput}
        {...field}
        {...props}
        autoComplete="new-password"
      />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
