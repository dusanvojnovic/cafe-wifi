import { useField } from 'formik';

import classes from './Input.module.css';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={classes.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={classes.textInput}
        style={props.style}
        {...field}
        {...props}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
