import { Field } from 'formik';
import classes from './Input.module.css';

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        className={classes.textInput}
        as="select"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Field>
    </>
  );
};

export default Select;
