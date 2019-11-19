import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [formData, setformData] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === formData.name)) {
      window.alert(`${formData.name} is already added to the phonebook.`);
      return;
    }
    setPersons(persons.concat(formData));
    setformData({ name: '', number: '' });
  };

  const handleFormInput = (e, type) => {
    const currentData = { ...formData };
    currentData[type] = e.target.value
    setformData(currentData);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={handleFilter} /></div>
      <form onSubmit={addPerson}>
        <div>name: <input value={formData.name} onChange={e => handleFormInput(e, 'name')} /></div>
        <div>number: <input type="number" value={formData.number} onChange={e => handleFormInput(e, 'number')} /></div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person, key) => {
          if (person.name.toLowerCase().includes(filter.toLowerCase()))
            return <p key={key}>{person.name} {person.number}</p>
        })
      }
    </div>
  )
}

export default App;