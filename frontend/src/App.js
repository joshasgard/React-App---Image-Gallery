import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';


const App = () => {
  const [word, setWord] = useState(''); //using state hooks to make the search box user input available 
                                        //as user is typing - called controlled component

  const handleSearchSubmit = (e) => {
    e.preventDefault(); //prevents default behaviour of the event, (i.e. default is to follow link on submit)
    console.log(word);
  }
  return (
    <div>
      <Header title = "Image Search Gallery"/> 
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}
export default App;
