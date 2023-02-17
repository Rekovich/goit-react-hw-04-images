import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, alt, onClose }) => {
  useEffect(() => {
    const handleEscapeClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeClose);
    return () => window.removeEventListener('keydown', handleEscapeClose);
  }, [onClose]);

  const handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClose}>
      <div className={css.Modal}>
        <img src={image} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
