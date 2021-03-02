import React from 'react';
import Part from '../components/Part';
import { CoursePart } from '../types';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
    return (
        <>
            {courseParts.map(c => <Part key={c.name} coursePart={c}/>)}
        </>
    );
};

export default Content;