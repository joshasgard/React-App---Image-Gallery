import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  const [word, setWord] = useState(''); //using state hooks to make the search box user input available
  //as user is typing - called controlled component

  const handleSearchSubmit = (e) => {
    e.preventDefault(); //prevents default behaviour of the event, (i.e. default to follow link on form submit)
    console.log(word);
    fetch(
      `https://api.unsplash.com//photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    setWord('');
  };

  return (
    <div>
      <Header title="Image Search Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  );
};
export default App;
