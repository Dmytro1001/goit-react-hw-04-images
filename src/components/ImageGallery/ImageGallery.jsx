import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ value, onClick }) => {
  return (
    <>
      <ImageGalleryList>
        {value.map(item => {
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
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
