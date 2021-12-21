import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from './Input';
import Button from '../Button/Button';
import classes from './Form.module.css';

const LoginForm = () => {
  const submitFormHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={submitFormHandler}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Please enter valid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        })}
        validateOnMount
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className={classes.btn} disabled={!isValid}>
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
