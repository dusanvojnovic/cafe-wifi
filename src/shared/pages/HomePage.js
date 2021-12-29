// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Formik, Form } from 'formik';
// import { BiSearch } from 'react-icons/bi';

import Button from '../components/Button/Button';
// import Input from '../components/Forms/Input';
// import CafesList from '../../cafes/components/CafesList/CafesList';
// import Modal from '../components/Modal/Modal';
// import Spinner from '../components/Spinner/Spinner';
// import { useHttpClient } from '../hooks/http-hook';

import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={classes.home}>
        <h1>Welcome to the HomePage</h1>
        <h2>
          <Link to="/signup">Create account</Link> and add your cafes.
        </h2>
        <h2>
          Already have account? <Link to="/login">LogIn</Link>
        </h2>
        <div className={classes.btn}>
          <Button to="/cafes">All Cafes</Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
