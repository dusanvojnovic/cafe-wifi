import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
  return (
    <nav className={classes.header}>
      <div className={classes.navbarBrand}>
        <Link to="/" className={classes.link}>
          Home
        </Link>
      </div>
      <div className={classes.navbarLinks}>
        <ul>
          <li>
            <Link to="/cafes" className={classes.link}>
              All Cafes
            </Link>
          </li>
          <li>
            <Link to="my-cafes" className={classes.link}>
              My Cafes
            </Link>
          </li>
          <li>
            <Link to="/" className={classes.link}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
