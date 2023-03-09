import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindiw, Images } from './Modal.styles';

export const Modal = ({ onClose, currentImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyModalClose);
    return () => {
      window.removeEventListener('keydown', handleKeyModalClose);
    };
  });

  const handleKeyModalClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindiw>
        <Images src={currentImage} alt="#" />
      </ModalWindiw>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired,
};
