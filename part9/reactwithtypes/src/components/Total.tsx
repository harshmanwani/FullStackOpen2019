import React from 'react';
import {CoursePart} from '../types';

const Total: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
    return (
        <p>
            Number of exercises {courseParts.reduce((prev, cur) => prev+cur.exerciseCount, 0)}
        </p>
    );
};

export default Total;