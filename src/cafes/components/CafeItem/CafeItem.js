import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BiCoffee, BiPlug, BiWifi, BiChair, BiStar } from 'react-icons/bi';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';

import Modal from '../../../shared/components/Modal/Modal';
import Map from '../../../shared/components/Map/Map';
import Spinner from '../../../shared/components/Spinner/Spinner';
import Button from '../../../shared/components/Button/Button';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import classes from './CafeItem.module.css';

const CafeItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

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
    setRating(0);
  };

  const handleRating = (rate) => {
    setRating(rate / 20);
  };

  const sendRatingHandler = async () => {
    console.log(rating);
    try {
      await sendRequest(
        `http://localhost:5000/api/cafes/rating/${props.id}`,
        'POST',
        JSON.stringify({
          overallRating: rating,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      closeRatingModal();
    } catch (err) {}
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
          <h1>{props.name}</h1>
          <h3>
            {props.address}, {props.city}
          </h3>
        </div>
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
        <IconContext.Provider value={{ color: '#fe8df2', size: '25px' }}>
          <div className={classes.icons}>
            <span>
              <BiCoffee /> <br /> coffe rating <br />
              {props.coffeeRating}/5
            </span>
            <span>
              <BiPlug /> <br /> socket availability <br />
              {props.socketAvailability}/5
            </span>
            <span>
              <BiChair /> <br /> number of seats <br />
              {props.numOfSeats}
            </span>
            <span>
              <BiWifi /> <br /> wifi strength <br />
              {props.wifiStrength}/5
            </span>
            <span>
              <BiStar /> <br /> overall rating <br />
              {props.overallRating}/5
            </span>
          </div>
        </IconContext.Provider>
        {showMap && (
          <Modal
            show
            style={{ width: '40%', height: '60%', left: '30%' }}
            header={`${props.name}, ${props.address}, ${props.city}`}
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
            header={`rate  ${props.name}!`}
            onClick={closeRatingModal}
            footer={
              <>
                <Button onClick={closeRatingModal}>cancel</Button>
                <Button
                  onClick={sendRatingHandler}
                  disabled={rating ? false : true}
                >
                  rate
                </Button>
              </>
            }
          >
            <div>
              <Rating
                emptyIcon={<BsStar size={30} />}
                fullIcon={<BsStarFill size={30} />}
                fillColor="white"
                onClick={handleRating}
                ratingValue={rating / 20}
              />
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
