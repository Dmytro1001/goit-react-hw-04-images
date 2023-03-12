import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { HeaderSearchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'react-scroll-to-top';
import { fetchImages } from '../services/getFetchImages';
import { Container } from './App.styles';
import { GlobalStyles } from './GlobalStyle';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [textSearch, setTextSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [loadBtnShown, setLoadBtnShown] = useState(true);

  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (textSearch === null) {
      return;
    }
    getImages(textSearch, page);
  }, [textSearch, page]);

  const getImages = async (value, page) => {
    await fetchImages(value, page)
      .then(data => {
        if (data.total === 0) {
          setLoading(false);
          toast.error(`Nothing was found for ${value}`, {
            position: 'top-center',
            theme: 'colored',
          });
        }

        if (data.hits.length < 12) {
          setLoadBtnShown(false);
        }

        setImages(images => [...images, ...data.hits]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page => page + 1);
  };

  return (
    <Container>
      <HeaderSearchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery value={images} />}

      {images.length > 0 && !loading && loadBtnShown && (
        <Button onClick={handleLoadMore} />
      )}
      {loading && <Loader />}
      <ScrollToTop smooth={true} color="#0000ff" />
      <ToastContainer autoClose={3000} />
      <GlobalStyles />
    </Container>
  );
};
