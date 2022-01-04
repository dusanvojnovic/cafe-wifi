import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import classes from './Navigation.module.css';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav
      className={classes.header}
      style={{
        backgroundColor: authCtx.isLoggedIn ? 'transparent' : '#005dff',
      }}
    >
      {authCtx.isLoggedIn ? (
        <div className={classes.navbarLinks}>
          <ul>
            <li>
              <Link to="/add" className={classes.link}>
                add cafe
              </Link>
            </li>
            <li>
              <Link to="/cafes" className={classes.link}>
                cafe list
              </Link>
            </li>
            <li>
              <Link to={`/${authCtx.userId}/cafes`} className={classes.link}>
                my list
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link} onClick={authCtx.logout}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className={classes.navbarBrand}>
            <Link to="/cafes" className={classes.link}>
              cafe list
            </Link>
          </div>
          <div className={classes.auth}>
            <ul>
              <li>
                <Link to="/signup" className={classes.link}>
                  create account
                </Link>
              </li>
              <li>
                <Link to="/login" className={classes.link}>
                  login
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
