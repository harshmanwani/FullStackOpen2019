import React from 'react';

const Course = ({ courses }) => (
  <div>
    {
      courses.map(course => (
        <div>
          <h2>{course.name}</h2>
          {
            course.parts.map(part => <p>{`${part.name} ${part.exercises}`}</p>)
          }
          <strong>Total of {course.parts.reduce((final, each) => final += each.exercises, 0)} exercises</strong>
        </div>
      ))
    }
  </div>
);

export default Course;