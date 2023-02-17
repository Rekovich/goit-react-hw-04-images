import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const { webformatURL, largeImageURL, tags } = image;

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItem_image}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal image={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
