import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from './Input';
import Button from '../Button/Button';
import classes from './Form.module.css';

const SignupForm = () => {
  const submitFormHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={submitFormHandler}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Please enter valid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref('password'), null],
              'Passwords must match, please try again'
            )
            .required('Confirm password is required'),
        })}
        validateOnMount
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            <Input
              label="Username"
              name="name"
              type="text"
              placeholder="Username"
            />
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
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <Button type="submit" className={classes.btn} disabled={!isValid}>
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
