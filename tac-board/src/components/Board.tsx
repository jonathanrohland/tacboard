import React from 'react';
import classnames from 'classnames';


import Field from './Field';
import './Board.css';
import { FieldIndex } from '../rootReducer';


function renderHouse(index: number) {
    const indexClass = `house-${index}`;

    return <div className={classnames("house", indexClass)}/> 

}

function Board(props: {

}) {
    console.log('Board props:', props);
    const fieldIndexes = Array.from(Array(80).keys()) as Array<FieldIndex>;
    console.log('indexes:', fieldIndexes);


    return (
        <div className={classnames("Board")}>
            { fieldIndexes.map(fieldIndex => <Field index={fieldIndex} />)}
            { [0,1,2,3].map(renderHouse)}
        </div>
    );
}

export default Board;
