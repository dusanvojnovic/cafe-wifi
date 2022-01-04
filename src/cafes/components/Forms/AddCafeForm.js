import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../../shared/components/Forms/Input';
import Select from '../../../shared/components/Forms/Select';
import Spinner from '../../../shared/components/Spinner/Spinner';
import Modal from '../../../shared/components/Modal/Modal';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import Button from '../../../shared/components/Button/Button';
import classes from './CafeForm.module.css';

const coffeeRatingOptions = [
  { value: '', label: '' },
  { value: '1', label: '☕' },
  { value: '2', label: '☕☕' },
  { value: '3', label: '☕☕☕' },
  { value: '4', label: '☕☕☕☕' },
  { value: '5', label: '☕☕☕☕☕' },
];

const socketAvailabilityOptions = [
  { value: '', label: '' },
  { value: '1', label: '🔌' },
  { value: '2', label: '🔌🔌' },
  { value: '3', label: '🔌🔌🔌' },
  { value: '4', label: '🔌🔌🔌🔌' },
  { value: '5', label: '🔌🔌🔌🔌🔌' },
];

const wifiStrengthOptions = [
  { value: '', label: '' },
  { value: '1', label: '📶' },
  { value: '2', label: '📶📶' },
  { value: '3', label: '📶📶📶' },
  { value: '4', label: '📶📶📶📶' },
  { value: '5', label: '📶📶📶📶📶' },
];

const overallRatingOptions = [
  { value: '', label: '' },
  { value: 1, label: '⭐' },
  { value: 2, label: '⭐⭐' },
  { value: 3, label: '⭐⭐⭐' },
  { value: 4, label: '⭐⭐⭐⭐' },
  { value: 5, label: '⭐⭐⭐⭐⭐' },
];

const AddCafeForm = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const submitFormHandler = async (values) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/cafes`,
        'POST',
        JSON.stringify({
          name: values.name,
          address: values.address,
          city: values.city,
          numOfSeats: values.numOfSeats,
          coffeeRating: values.coffeeRating,
          socketAvailability: values.socketAvailability,
          wifiStrength: values.wifiStrength,
          overallRating: values.overallRating,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
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
          name: '',
          address: '',
          city: '',
          coffeeRating: '',
          socketAvailability: '',
          numOfSeats: '',
          wifiStrength: '',
          overallRating: [''],
        }}
        onSubmit={submitFormHandler}
        validationSchema={Yup.object({
          name: Yup.string().required('name is required'),
          address: Yup.string().required('address is required'),
          city: Yup.string().required('city name is required'),
          coffeeRating: Yup.string().required('please rate coffee'),
          socketAvailability: Yup.string().required(
            'please rate socket avability'
          ),
          numOfSeats: Yup.string().required('enter number of seats'),
          wifiStrength: Yup.string().required('please rate wifi strength'),
          overallRating: Yup.number().required('enter overall rating'),
        })}
        validateOnMount
      >
        {({ isValid }) => (
          <Form className={classes.form} style={{ paddingTop: '0' }}>
            <Input label="name" name="name" type="text" />
            <Input label="address" name="address" type="text" />
            <Input label="city" name="city" type="text" />
            <Input label="number of seats" name="numOfSeats" type="text" />
            <Select
              label="coffee rating"
              options={coffeeRatingOptions}
              name="coffeeRating"
            />
            <Select
              label="socket availability"
              options={socketAvailabilityOptions}
              name="socketAvailability"
            />
            <Select
              label="wifi strength"
              options={wifiStrengthOptions}
              name="wifiStrength"
            />
            <Select
              label="overall rating"
              options={overallRatingOptions}
              name="overallRating[0]"
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

export default AddCafeForm;
