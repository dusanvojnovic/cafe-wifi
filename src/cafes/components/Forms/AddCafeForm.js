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
import classes from '../../../shared/components/Forms/Form.module.css';

const coffeeRatingOptions = [
  { value: '', label: 'Select Rating' },
  { value: '1', label: '☕' },
  { value: '2', label: '☕☕' },
  { value: '3', label: '☕☕☕' },
  { value: '4', label: '☕☕☕☕' },
  { value: '5', label: '☕☕☕☕☕' },
];

const socketAvailabilityOptions = [
  { value: '', label: 'Select Rating' },
  { value: '1', label: '🔌' },
  { value: '2', label: '🔌🔌' },
  { value: '3', label: '🔌🔌🔌' },
  { value: '4', label: '🔌🔌🔌🔌' },
  { value: '5', label: '🔌🔌🔌🔌🔌' },
];

const wifiStrengthOptions = [
  { value: '', label: 'Select Rating' },
  { value: '1', label: '📶' },
  { value: '2', label: '📶📶' },
  { value: '3', label: '📶📶📶' },
  { value: '4', label: '📶📶📶📶' },
  { value: '5', label: '📶📶📶📶📶' },
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
        }}
        onSubmit={submitFormHandler}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          address: Yup.string().required('Address is required'),
          city: Yup.string().required('City name is required'),
          coffeeRating: Yup.string().required('Please rate coffee'),
          socketAvailability: Yup.string().required(
            'Please rate socket avability'
          ),
          numOfSeats: Yup.string().required('Enter number of seats'),
          wifiStrength: Yup.string().required('Please rate wifi strength'),
        })}
        validateOnMount
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            <Input label="Name" name="name" type="text" placeholder="Name" />
            <Input
              label="Address"
              name="address"
              type="text"
              placeholder="Address"
            />
            <Input label="City" name="city" type="text" placeholder="City" />
            <Input
              label="Number of seats"
              name="numOfSeats"
              type="text"
              placeholder="Number of seats"
            />
            <Select
              label="Coffee Rating"
              options={coffeeRatingOptions}
              name="coffeeRating"
            />
            <Select
              label="Socket Availability"
              options={socketAvailabilityOptions}
              name="socketAvailability"
            />
            <Select
              label="Wifi Strength"
              options={wifiStrengthOptions}
              name="wifiStrength"
            />
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddCafeForm;
