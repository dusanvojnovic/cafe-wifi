import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const Button = (props) => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={props.className || classes.button}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
