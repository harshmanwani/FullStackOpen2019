import React from 'react';

const Country = ({ data }) => {
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
      <img src={data.flag} alt={`Flag of ${data.name}`} width="20%" height="20%"/>
    </div>
  );
};

export default Country;