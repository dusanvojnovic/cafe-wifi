import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    document.getElementById('backdrop')
  );
};

const ModalOverlay = (props) => {
  const content = (
    <div className={classes.modal} style={props.style}>
      <header className={classes.modalHeader}>
        <h2>{props.header}</h2>
      </header>
      <div className={classes.modalContent}>{props.children}</div>
      <footer className={classes.modalFooter}>{props.footer}</footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('overlays'));
};

const Modal = (props) => {
  return (
    <>
      {<Backdrop onClick={props.onClick} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes.modal}
      >
        <ModalOverlay key="transition-group-content" {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
