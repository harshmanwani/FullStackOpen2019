import React from 'react';
import Country from './Country';

const Results = ({ results, showCountry }) => {
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (results.length > 1) {
    return <div>
      {
        results.map(result => (
          <div key={result.cioc}>
            {result.name}
            &nbsp;
            <button onClick={() => showCountry([result])}>Show</button>
          </div>
        ))
      }
    </div>;
  }
  if (results.length === 1) {
    return <Country data={results[0]} />;
  }
  return <React.Fragment/>;
};

export default Results;