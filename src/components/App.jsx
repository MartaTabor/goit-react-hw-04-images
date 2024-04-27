import { useState, useEffect } from 'react';
import { fetchPhotos } from './api';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

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

    const fetchData = async () => {
      setLoader(true);
      try {
        const data = await fetchPhotos(query, page);
        if (page === 1) {
          setImages(data.hits);
          setTotalHits(data.totalHits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoader(false);
    };

    fetchData();
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
