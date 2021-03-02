import React from 'react';
import {CoursePart} from '../types';
import {assertNever} from '../utils';

const Part: React.FC<{coursePart: CoursePart}> = ({coursePart}) => {
    switch(coursePart.name) {
        case 'Fundamentals':
            return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>;
        case 'Using props to pass data':
            return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>;
        case 'Deeper type usage':
            return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}</p>;
        case 'Using HTML as a programming language: Revised':
            return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>;
        default:
            return assertNever(coursePart);
    }
};

export default Part;