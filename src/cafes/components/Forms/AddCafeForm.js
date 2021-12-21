import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../../shared/components/Forms/Input';
import Select from '../../../shared/components/Forms/Select';
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
  const submitFormHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          address: '',
          coffeeRating: '',
          socketAvailability: '',
          numOfSeats: '',
          wifiStrength: '',
        }}
        onSubmit={submitFormHandler}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          address: Yup.string().required('Address is required'),
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
              label="Addres"
              name="address"
              type="text"
              placeholder="Address"
            />
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
            <Button type="submit" className={classes.btn} disabled={!isValid}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddCafeForm;
