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
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
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
          name: Yup.string().required('name is required'),
          email: Yup.string()
            .email('please enter valid email address')
            .required('email is required'),
          password: Yup.string()
            .min(6, 'password must be at least 6 characters long')
            .required('password is required'),
          confirmedPassword: Yup.string()
            .oneOf(
              [Yup.ref('password'), null],
              'passwords must match, please try again'
            )
            .required('confirm password is required'),
        })}
        validateOnMount
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            <Input label="username" name="name" type="text" />
            <Input label="email" name="email" type="email" />
            <Input label="password" name="password" type="password" />
            <Input
              label="confirm password"
              name="confirmedPassword"
              type="password"
            />
            <Button type="submit" disabled={!isValid}>
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
