import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const addNewName = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook.`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p>{person.name}</p>)
      }
    </div>
  )
}

export default App