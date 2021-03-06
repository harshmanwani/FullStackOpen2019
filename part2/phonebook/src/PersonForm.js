import React from 'react';

const PersonForm = ({addPerson, formData, handleFormInput}) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={formData.name} onChange={e => handleFormInput(e, 'name')} required/></div>
      <div>number: <input type="number" value={formData.number} onChange={e => handleFormInput(e, 'number')} required/></div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;