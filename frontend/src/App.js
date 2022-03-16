// Import components, modules and stylesheets
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';

// Backend API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

// React app
const App = () => {
  const [word, setWord] = useState(''); //using state hooks to make the search box input available
  //as user is typing - (controlled component)
  const [images, setImages] = useState([]); // state hook for images
  const [loading, setLoading] = useState(true); // state hook for spinner

  const getSavedImages = async () => {
    // Event listener to save images
    try {
      const result = await axios.get(`${API_URL}/images`);
      setImages(result.data || []);
      setLoading(false);
      toast.success('Saved images Downloaded!');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    // Event listener to send search query to backend api
    e.preventDefault(); //prevents default behaviour of the event, (i.e. default to follow link on form submit)
    console.log('sending fetch request');

    try {
      const result = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...result.data, title: word }, ...images]);
      toast.info(`New image ${word} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };
  const handleDeleteImage = async (id) => {
    // const imageToBeDeleted = images.find((image) => image.id === id);
    try {
      const result = await axios.delete(`${API_URL}/images/${id}`);
      if (result.status === 204) {
        toast.warning(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;
    try {
      const result = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (result.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Header title="Image Search Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
export default App;
