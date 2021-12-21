import { useState } from 'react';

import { BiCoffee } from 'react-icons/bi';
import { BiPlug } from 'react-icons/bi';
import { BiWifi } from 'react-icons/bi';
import { BiChair } from 'react-icons/bi';

import Modal from '../../../shared/components/Modal/Modal';
import Map from '../../../shared/components/Map/Map';
import Button from '../../../shared/components/Button/Button';

import classes from './CafeItem.module.css';

const CafeItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <li className={classes.cafeItem}>
      <div className={classes.content}>
        <div className={classes.cafeInfo}>
          <h2>{props.name}</h2>
          <h5>{props.address}</h5>
          <h5>{props.city}</h5>
        </div>
        <div className={classes.icons}>
          <span>
            <BiCoffee /> <br /> Coffe Rating <br />
            {props.coffeRating}/5
          </span>
          <span>
            <BiPlug /> <br /> Socket Avability <br />
            {props.coffeRating}/5
          </span>
          <span>
            <BiChair /> <br /> Number of Seats <br />
            {props.numOfSeats}
          </span>
          <span>
            <BiWifi /> <br /> Wifi Strength <br />
            {props.wifiStrength}/5
          </span>
        </div>
        {showModal && (
          <Modal show onCancel={closeModalHandler}>
            <div className={classes.mapContainer}>
              <Map center={props.coordinates} zoom={16} />
            </div>
          </Modal>
        )}
        <div className={classes.buttons}>
          <Button>edit</Button>
          <Button>delete</Button>
          <Button onClick={openModalHandler}>view on map</Button>
        </div>
      </div>
    </li>
  );
};

export default CafeItem;
