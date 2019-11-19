import React, { useState } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        formData={formData}
        handleFormInput={handleFormInput}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App;