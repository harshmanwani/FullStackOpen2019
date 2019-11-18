import React from 'react';

const Course = ({course, total}) => (
  <div>
    <h1>{course.name}</h1>
    {
      course.parts.map(part => <p>{`${part.name} ${part.exercises}`}</p> )
    }
    <strong>Total of {total} exercises</strong>
  </div>
);

export default Course;