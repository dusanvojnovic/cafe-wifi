import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BiCoffee } from 'react-icons/bi';
import { BiPlug } from 'react-icons/bi';
import { BiWifi } from 'react-icons/bi';
import { BiChair } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';

import Modal from '../../../shared/components/Modal/Modal';
import Map from '../../../shared/components/Map/Map';
import BasicRating from '../BasicRating/BasicRating';
import Spinner from '../../../shared/components/Spinner/Spinner';
import Button from '../../../shared/components/Button/Button';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import classes from './CafeItem.module.css';

const CafeItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const openRatingModal = () => {
    setRatingModal(true);
  };

  const closeRatingModal = () => {
    setRatingModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/cafes/${props.id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <li className={classes.cafeItem}>
      <div className={classes.content}>
        <div className={classes.cafeInfo}>
          <h2>{props.name}</h2>
          <h5>
            {props.address}, {props.city}
          </h5>
        </div>
        <IconContext.Provider value={{ color: 'blue', size: '20px' }}>
          <div className={classes.icons}>
            <span>
              <BiCoffee /> <br /> Coffe Rating <br />
              {props.coffeeRating}/5
            </span>
            <span>
              <BiPlug /> <br /> Socket Availability <br />
              {props.socketAvailability}/5
            </span>
            <span>
              <BiChair /> <br /> Number of Seats <br />
              {props.numOfSeats}
            </span>
            <span>
              <BiWifi /> <br /> Wifi Strength <br />
              {props.wifiStrength}/5
            </span>
            <span>
              <BiStar /> <br /> Overall Rating <br />
              3.6/5
            </span>
          </div>
        </IconContext.Provider>
        {showMap && (
          <Modal
            show
            style={{ width: '40%', height: '60%', left: '30%' }}
            header={`${props.address}, ${props.city}`}
            onClick={closeMapHandler}
          >
            <div className={classes.mapContainer}>
              <Map center={props.coordinates} zoom={17} />
            </div>
          </Modal>
        )}
        {showModal && (
          <Modal
            show
            header="Are you sure?"
            onClick={closeModalHandler}
            footer={
              <>
                <Button onClick={closeModalHandler}>cancel</Button>
                <Button onClick={confirmDeleteHandler}>delete</Button>
              </>
            }
          >
            <p>
              Do you want to remove '{props.name}' cafe? Please note that it
              can't be undone thereafter
            </p>
          </Modal>
        )}
        {ratingModal && (
          <Modal
            show
            header={props.name}
            onClick={closeRatingModal}
            footer={
              <>
                <Button onClick={closeRatingModal}>cancel</Button>
                <Button>rate</Button>
              </>
            }
          >
            <div className={classes.ratingBox}>
              <BasicRating />
            </div>
          </Modal>
        )}
        {isLoading && <Spinner />}
        <div className={classes.buttons}>
          <Button onClick={() => navigate(`/cafes/${props.id}`)}>edit</Button>
          <Button onClick={openRatingModal}>rate</Button>
          <Button onClick={openModalHandler}>delete</Button>
          <Button onClick={showMapHandler}>view on map</Button>
        </div>
      </div>
    </li>
  );
};

export default CafeItem;
