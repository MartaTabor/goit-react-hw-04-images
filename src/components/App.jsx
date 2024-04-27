import { useState, useEffect } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

const API_KEY = '42459291-7f50c47c6b19e5b61fce58d70';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') return;

    const fetchPhotos = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoader(false);
    };

    fetchPhotos();
  }, [query, page]);

  const handleSearch = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = e => {
    const largeImageUrl = e.target.getAttribute('data-large');
    setModalImageUrl(largeImageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const maxImagesReached = images.length >= totalHits;

  return (
    <div className="app">
      <Searchbar handleSearch={handleSearch} />
      {loader ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={handleImageClick} />
      )}
      {!maxImagesReached && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      {showModal && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};
