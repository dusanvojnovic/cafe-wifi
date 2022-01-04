import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={classes.home}>
        <div className={classes.homeText}>
          <h1>Working remote?</h1>
          <h1>This is a place for you!</h1>
          <h1>Look out for best cafes for remote work.</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
