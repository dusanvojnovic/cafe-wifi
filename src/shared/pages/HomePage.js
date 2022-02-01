import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={classes.home}>
        <div className={classes.homeText}>
          <h1 className={classes.homeTextFirst}>Working remote?</h1>
          <h1 className={classes.homeTextSecond}>This is a place for you!</h1>
          <h1 className={classes.homeTextThird}>
            Look out for best cafes for remote work.
          </h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
