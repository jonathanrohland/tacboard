import React from 'react';
import classnames from 'classnames';


import Field from './Field';
import './Board.css';
import { FieldIndex, Color } from '../types';
import House from './House';


function Board(props: {

}) {
    console.log('Board props:', props);
    const fieldIndexes = Array.from(Array(80).keys()) as Array<FieldIndex>;
    console.log('indexes:', fieldIndexes);


    return (
        <div className={classnames("Board")}>
            { fieldIndexes.map(fieldIndex => <Field index={fieldIndex} />)}
    { [Color.RED, Color.BLUE, Color.GREEN,  Color.BLACK].map(color => <House color={color} />)}
        </div>
    );
}

export default Board;
