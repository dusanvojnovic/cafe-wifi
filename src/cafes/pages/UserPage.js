import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/Spinner/Spinner';
import Modal from '../../shared/components/Modal/Modal';
import CafesList from '../components/CafesList/CafesList';
// import Button from '../../../shared/components/Button/Button';
import classes from './UserPage.module.css';

const UserPage = () => {
  const [loadedCafes, setLoadedCafes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/cafes/user/${userId}`
        );
        setLoadedCafes(responseData.cafes);
      } catch (err) {}
    };
    fetchCafes();
  }, [sendRequest, userId]);

  const deleteCafeHandler = (cafeId) => {
    setLoadedCafes((prevCafes) =>
      prevCafes.filter((cafe) => cafe.id !== cafeId)
    );
  };

  return (
    <>
      {error && (
        <Modal show header="Ooops!" onClick={clearError} errorModal>
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

export default UserPage;
