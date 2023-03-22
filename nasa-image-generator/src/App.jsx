import { useState } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const [filters, setFilters] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [copyright, setCopyright] = useState(null);

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if ((json.media_type && year && json.copyright) && (filters.includes(json.media_type) || filters.includes(year) || filters.includes(json.copyright))) {
      //makeQuery();
      return;
    }
    setCurrentImage(json.url);
    setTitle(json.title);
    setMediaType(json.media_type);
    if (json.copyright == null) {
      setCopyright("no copyright")
    }
    else {
      setCopyright(json.copyright);
    }
    //setPrevImages((images) => [...images, json.url]);
  };

  const makeQuery = () => {
    var x = {
      year: Math.floor(Math.random() * (2023 - 1999) + 1999).toString(),
      month: Math.floor(Math.random() * (13 - 1) + 1).toString(),
      day: Math.floor(Math.random() * (29 - 1) + 1).toString()
    };
    setYear(x.year);

    let query = `https://api.nasa.gov/planetary/apod?date=${x.year}-${x.month}-${x.day}&api_key=${ACCESS_KEY}`;
    callAPI(query).catch(console.error);
  };

  const addFilterYear = () => {
    setFilters([...filters, year]);
  }

  const addFilterMedia = () => {
    setFilters([...filters, mediaType]);
  }

  const addFilterCopyright = () => {
    setFilters([...filters, copyright]);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>NASA Image Generator</h1>
        <h3>{title}</h3>
      </div>

      <div className="image-box">
        <div className="attr-box">
          <button className="attr-button" onClick={addFilterYear}>{year}</button>
          <button className="attr-button" onClick={addFilterMedia}>{mediaType}</button>
          <button className="attr-button" onClick={addFilterCopyright}>{copyright}</button>
        </div>
        <img src={currentImage} width="500"/>
      </div>

      <div className="ban-list">
        <h4>Filters: {filters.join(', ')}</h4>
      </div>

      <div className="button-container">
        <button className="button" onClick={makeQuery}>🔀 New Image</button>
      </div>
    </div>
  )
}

export default App
