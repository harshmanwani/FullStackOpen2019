import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WEATHERSTACK_API_KEY } from './constants';

const Country = ({ data }) => {
  const [weather, setWeather] = useState();
  const apiParams = {
    access_key: WEATHERSTACK_API_KEY,
    query: data.capital
  }
  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params: apiParams })
      .then(response => setWeather(response.data.current))
  }, []);
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Capital <strong>{data.capital}</strong></p>
      <p>Population <strong>{data.population}</strong></p>
      <h3>Languages</h3>
      <ul>
        {
          data.languages.map((lang, key) => <li key={key}>{lang.name}</li>)
        }
      </ul>
      <img src={data.flag} alt={`Flag of ${data.name}`} width="20%" height="20%" />
      <h2>Weather in {data.capital}</h2>
      {
        weather
        ? <div>
            <p><strong>Temperature: </strong>{weather.temperature} °C ({weather.weather_descriptions[0]})</p>
            <img src={weather.weather_icons[0]} alt="Weather Icon" />
            <p><strong>Wind:</strong> {weather.wind_speed} kph, Direction {weather.wind_dir}</p>
        </div>
        : <div>Loading...</div>
      }
    </div>
  );
};

export default Country;