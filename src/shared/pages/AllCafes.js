import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { BiSearch } from 'react-icons/bi';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/Spinner/Spinner';
import Modal from '../../shared/components/Modal/Modal';
import Input from '../components/Forms/Input';
import CafesList from '../../cafes/components/CafesList/CafesList';
import Button from '../../shared/components/Button/Button';
import classes from './AllCafes.module.css';

const AllCafes = () => {
  const [loadedCafes, setLoadedCafes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const queryRef = useRef();
  // const navigate = useNavigate();

  // const city = useParams().name;

  const submitFormHandler = async (values, resetForm) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/cafes/city/${values.city}`
      );
      values.city = '';
      setLoadedCafes(responseData.cafes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/cafes`
        );
        setLoadedCafes(responseData.cafes);
      } catch (err) {}
    };
    fetchCafes();
  }, [sendRequest]);

  const deleteCafeHandler = (cafeId) => {
    setLoadedCafes((prevCafes) =>
      prevCafes.filter((cafe) => cafe.id !== cafeId)
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          city: '',
        }}
        onSubmit={submitFormHandler}
      >
        <Form>
          <div className={classes.wrap}>
            <div className={classes.search}>
              <Input
                type="text"
                name="city"
                className={classes.searchTerm}
                placeholder="Search by city name.."
              />
              <Button
                type="submit"
                onClick={submitFormHandler}
                className={classes.searchButton}
              >
                <BiSearch />
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
      {error && (
        <Modal
          show
          header="Ooops!"
          onClick={clearError}
          onButtonClick={clearError}
        >
          {error}
        </Modal>
      )}
      {isLoading && <Spinner />}
      {!isLoading && loadedCafes && (
        <div className={classes.cafes}>
          <CafesList items={loadedCafes} onDeleteCafe={deleteCafeHandler} />
        </div>
      )}
    </>
  );
};

export default AllCafes;
