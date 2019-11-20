import React from 'react';
import Country from './Country';

const Results = ({ results }) => {
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (results.length > 1) {
    return <div>
      {
        results.map(result => <div key={result.cioc}>{result.name}</div>)
      }
    </div>;
  }
  if (results.length === 1) {
    return <Country data={results[0]} />;
  }
  return <div></div>;
};

export default Results;