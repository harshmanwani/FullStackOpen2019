import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setformData] = useState({ name: '', number: '' })

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === formData.name)) {
      window.alert(`${formData.name} is already added to the phonebook.`);
      return;
    }
    setPersons(persons.concat(formData));
    setformData({ name: '', number: '' });
  }

  const handleFormInput = (e, type) => {
    const currentData = { ...formData };
    currentData[type] = e.target.value
    setformData(currentData);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={formData.name} onChange={e => handleFormInput(e, 'name')} /></div>
        <div>number: <input type="number" value={formData.number} onChange={e => handleFormInput(e, 'number')} /></div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App;