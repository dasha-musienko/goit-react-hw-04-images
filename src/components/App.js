import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyles/GlobalStyles';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Layout } from './Layout/Layout.styled';
import { Loader } from './Loader/Loader';
import { fetchImg } from './api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function handleFetch() {
      try {
        setLoading(true);
        const data = await fetchImg(query, page);
        const { totalHits, hits } = data;
        if (totalHits === 0) {
          toast.error(`There are no pictures for your search`);
          return;
        }
        setImages(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error(`Try to reload page`);
      } finally {
        setLoading(false);
      }
    }
    handleFetch();
  }, [page, query]);

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={handleLoadMore} />
      )}
      <GlobalStyle />
      <Toaster position="top-right" />
    </Layout>
  );
};
