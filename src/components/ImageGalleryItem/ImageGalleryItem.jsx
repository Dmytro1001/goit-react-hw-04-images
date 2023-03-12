import { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  ImageGalleryEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styles';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ url, bigImage }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [, setCurrentImage] = useState(null);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const openModal = bigImage => {
    setCurrentImage(bigImage);
    setIsOpenModal(true);
  };
  return (
    <>
      <ImageGalleryEl onClick={openModal}>
        <ImageGalleryItemImage src={url} alt="#" />
      </ImageGalleryEl>
      {isOpenModal && <Modal onClose={toggleModal} currentImage={bigImage} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
};
