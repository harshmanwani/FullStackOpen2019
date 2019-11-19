import React from 'react';

const Persons = ({persons, filter}) => {
  return persons.map((person, key) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase()))
      return <p key={key}>{person.name} {person.number}</p>
  })
};

export default Persons;