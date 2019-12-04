import React from 'react';

const Persons = ({persons, filter, deleteEntry}) => {
  return persons.map((person, key) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase()))
      return <div key={key}>
        <span>{person.name} {person.number}</span>
        &nbsp;
        <button onClick={() => deleteEntry(person)}>Delete</button>
      </div>
  })
};

export default Persons;