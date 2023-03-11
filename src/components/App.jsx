import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { HeaderSearchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styles';
import { GlobalStyles } from './GlobalStyle';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const openModal = largeImage => {
    setCurrentImage(largeImage);
    setIsOpenModal(true);
  };

  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
  };

  return (
    <Container>
      <HeaderSearchbar onSubmit={handleSubmit} />
      <ImageGallery value={textSearch} onClick={openModal} />
      {isOpenModal && (
        <Modal onClose={toggleModal} currentImage={currentImage} />
      )}
      <ToastContainer autoClose={3000} />
      <GlobalStyles />
    </Container>
  );
};
