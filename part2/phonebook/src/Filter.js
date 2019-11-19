import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div>Filter shown with <input value={value} onChange={e => onChange(e.target.value)} /></div>
  );
};

export default Filter;