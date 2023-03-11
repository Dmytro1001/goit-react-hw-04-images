import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../../services/getFetchImages';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ value, onClick }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [loadBtnShown, setLoadBtnShown] = useState(true);

  useEffect(() => {
    if (value !== '') {
      getImages(value, 1);
    }

    return () => {
      setImages([]);
      setPage(1);
    };
  }, [value]);

  useEffect(() => {
    if (page > 1) {
      getImages(value, page);
    }
  }, [page]);

  const getImages = async (value, page) => {
    await fetchImages(value, page)
      .then(data => {
        if (data.total === 0) {
          setLoading(false);
          toast.error(`Nothing was found for ${value}`, {
            position: 'top-center',
            theme: 'colored',
          });

          return;
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
    <>
      <ImageGalleryList>
        {images.length > 0 &&
          images.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                url={item.webformatURL}
                onClick={onClick}
                bigImage={item.largeImageURL}
              />
            );
          })}
      </ImageGalleryList>
      {images.length > 0 && !loading && loadBtnShown && (
        <Button onClick={handleLoadMore} />
      )}
      {loading && <Loader />}
      <ToastContainer autoClose={3000} />
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
