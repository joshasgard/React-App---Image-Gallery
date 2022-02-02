import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [word, setWord] = useState(''); //using state hooks to make the search box user input available
  //as user is typing - called controlled component
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); //prevents default behaviour of the event, (i.e. default to follow link on form submit)
    fetch(
      `https://api.unsplash.com//photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((result) => result.json())
      .then((result) => {
        setImages([{ ...result, title: word }, ...images]);
      })
      .catch((error) => {
        console.log(error);
      });
    setWord('');
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Image Search Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};
export default App;
