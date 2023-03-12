import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styles';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ value }) => {
  return (
    <>
      <ImageGalleryList>
        {value.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              url={item.webformatURL}
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
};
