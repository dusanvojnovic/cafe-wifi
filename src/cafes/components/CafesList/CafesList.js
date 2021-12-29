import CafeItem from '../CafeItem/CafeItem';

import classes from './CafesList.module.css';

const add = (accumulator, a) => {
  return accumulator + a;
};

const CafesList = (props) => {
  return (
    <ul className={classes.list}>
      {props.items.map((cafe) => (
        <CafeItem
          id={cafe.id}
          key={cafe.address}
          name={cafe.name}
          address={cafe.address}
          city={cafe.city}
          coordinates={cafe.location}
          numOfSeats={cafe.numOfSeats}
          wifiStrength={cafe.wifiStrength}
          socketAvailability={cafe.socketAvailability}
          coffeeRating={cafe.coffeeRating}
          overallRating={
            Math.round(
              (cafe.overallRating.reduce(add, 0) / cafe.overallRating.length) *
                10
            ) / 10
          }
          onDelete={props.onDeleteCafe}
        />
      ))}
    </ul>
  );
};

export default CafesList;
