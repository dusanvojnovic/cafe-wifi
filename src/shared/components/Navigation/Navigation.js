import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import classes from './Navigation.module.css';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.header}>
      <div className={classes.navbarBrand}>
        <Link to="/" className={classes.link}>
          Home
        </Link>
      </div>

      {authCtx.isLoggedIn && (
        <div className={classes.navbarLinks}>
          <ul>
            <li>
              <Link to="/add" className={classes.link}>
                Add Cafe
              </Link>
            </li>
            <li>
              <Link to="/cafes" className={classes.link}>
                All Cafes
              </Link>
            </li>
            <li>
              <Link to={`/${authCtx.userId}/cafes`} className={classes.link}>
                My Cafes
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link} onClick={authCtx.logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
