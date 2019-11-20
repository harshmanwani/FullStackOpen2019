import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';

function App() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, []);

  const onChange = e => {
    const value = e.target.value;
    setInputValue(value);
    setResults(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())));
  }

  return (
    <div className="App">
      <div>Find Countries: <input value={inputValue} onChange={onChange} /></div>
      <Results results={results} />
    </div>
  );
}

export default App;
