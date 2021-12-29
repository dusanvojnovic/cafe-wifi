import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.spinnerOverlay}>
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />;
    </div>
  );
};

export default Spinner;
