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

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitFormHandler = async (values) => {
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/login',
        'POST',
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      authCtx.login(responseData.id, responseData.token);
      navigate(`/cafes`);
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
            <Button type="submit" disabled={!isValid}>
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
