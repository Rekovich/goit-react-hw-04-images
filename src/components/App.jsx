import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { fetchPhotos } from 'servises/fetchPhotos';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import css from '../index.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHitsPage, setTotalHitsPage] = useState(null);

  const handleSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
    setIsLoaded(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    async function loadNewImage() {
      try {
        const images = await fetchPhotos({query, page});
        if (images.totalHitsPage === 0) {
          Notify.failure('Please write something');
        }
        setImages(prevState => [...prevState, ...images.hits]);
        setIsLoaded(false);
        setTotalHitsPage(images.totalHitsPage);
      } catch (error) {
     
      } finally {
        setIsLoaded(false);
      }
    }
    loadNewImage();
  }, [query, isLoaded, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {isLoaded && <Loader />}
      <ImageGallery images={images} />
      {images.length > 0 && images.length !== totalHitsPage && !isLoaded && (
        <Button onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
