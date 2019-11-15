import React from 'react';

const Course = ({course}) => (
  <div>
    <h1>{course.name}</h1>
    {
      course.parts.map(part => <p>{`${part.name} ${part.exercises}`}</p> )
    }
  </div>
);

export default Course;