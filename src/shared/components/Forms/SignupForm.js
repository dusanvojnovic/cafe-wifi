import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import Input from './Input';
import Button from '../Button/Button';
import classes from './Form.module.css';

const SignupForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitFormHandler = async (values) => {
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signup',
        'POST',
        JSON.stringify({
          email: values.email,
          username: values.name,
          password: values.password,
          confirmedPassword: values.confirmedPassword,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      authCtx.login(responseData.userId, responseData.token);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error && (
        <Modal
          show
          header="An error has occurred"
          onClick={clearError}
          footer={<Button onClick={clearError}>Ok</Button>}
        >
          {error}
        </Modal>
      )}
      {isLoading && <Spinner />}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmedPassword: '',
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
          confirmedPassword: Yup.string()
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
              name="confirmedPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <Button type="submit" disabled={!isValid}>
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
