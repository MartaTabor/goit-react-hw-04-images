import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imageUrl, largeImageUrl, onClick }) => {
  return (
    <li className="imageGalleryItem">
      <img
        src={imageUrl}
        alt=""
        data-large={largeImageUrl}
        className="imageGalleryItem-image"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string,
  largeImageUrl: PropTypes.string,
  onClick: PropTypes.func,
};
