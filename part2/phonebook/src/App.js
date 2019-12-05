import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PhonebookService from './Services';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setformData] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('');

  useEffect(() => {
    PhonebookService
      .getAll()
      .then(response => setPersons(response))
      .catch(error => alert(error));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const currentData = [...persons];
    const existing = persons.findIndex(person => person.name === formData.name);
    if (existing !== -1 && window.confirm(`${formData.name} is already added to phonebook, replace the old number with a new one?`)) {
      PhonebookService
        .updateNumber(persons[existing].id, formData)
        .then(response => {
          currentData[existing] = response;
          setPersons(currentData);
          setformData({ name: '', number: '' });
        })
      return;
    }
    PhonebookService
      .addPerson(formData)
      .then(response => {
        setPersons(persons.concat(response));
        setformData({ name: '', number: '' });
      })
      .catch(error => alert(error));
  };

  const deleteEntry = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      PhonebookService
        .deleteEntry(person.id)
        .then(response => {
          setPersons(persons.filter(item => item.id !== person.id))
        })
        .catch(error => alert(error))
    }
    return 0;
  }

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
      <Persons
        persons={persons}
        filter={filter}
        deleteEntry={deleteEntry}
      />
    </div>
  )
}

export default App;