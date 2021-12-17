import { BiCoffee } from 'react-icons/bi';
import { BiPlug } from 'react-icons/bi';
import { BiWifi } from 'react-icons/bi';
import { BiChair } from 'react-icons/bi';

import classes from './CafeItem.module.css';

const CafeItem = (props) => {
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
        <div className={classes.buttons}>
          <button>edit</button>
          <button>delete</button>
          <button>view on map</button>
        </div>
      </div>
    </li>
  );
};

export default CafeItem;
