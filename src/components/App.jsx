import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from '../services/image-api';
import { AppContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const changeQuery = newQuery => {
    setQuery(`${nanoid(5)}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  // Запит даних з бекенда
  useEffect(() => {
    if (query === '') return;
    async function getImages() {
      try {
        setLoading(true);
        const CorrectedQuery = query.slice(
          query.indexOf('/') + 1,
          query.length
        );
        const response = await fetchImages(CorrectedQuery, page);
        const images = response.hits;
        if (images.length === 0) {
          toast.error(
            'Sorry, there aren`t images for your request. Input a new query'
          );
          return;
        }
        setImages(prevState => [...prevState, ...images]);
        toast.success('Wow, you are cool!');
      } catch (error) {
        toast.error('Oops, something went wrong, please try again later');
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {!!images.length && images.length % 12 === 0 && (
        <Button onClick={loadMore} />
      )}
      <Toaster />
    </AppContainer>
  );
};
