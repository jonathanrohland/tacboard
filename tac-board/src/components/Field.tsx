import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { State, FieldIndex, Color } from '../rootReducer';
import './Field.css';


type OwnProps = {
    index: FieldIndex;
}

type StateProps = {
    color: Color | 'empty'
}

type Props = OwnProps & StateProps;


function Field(props: Props) {
    const indexClass = `field-${props.index}`;

    return <div className={classnames("field", indexClass, props.color.toString())} />
}

function mapStateToProps(state: State, { index }: OwnProps): StateProps {
    return { color: state.marblePositions![index] || 'empty' }
}

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Field);
