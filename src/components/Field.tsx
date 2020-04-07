import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { State, FieldIndex, Color } from '../types';
import './Field.css';
import { ActionType } from '../actions';


type OwnProps = {
    index: FieldIndex;
}

type StateProps = {
    color: Color | 'empty'
}

type DispatchProps = {
    onFieldClick: () => {}
}

type Props = OwnProps & StateProps & DispatchProps;


function Field(props: Props) {
    const indexClass = `field-${props.index}`;

    return <div onClick={props.onFieldClick} className={classnames("field", indexClass, `field--${props.color.toString()}`)} />
}

function mapStateToProps(state: State, { index }: OwnProps): StateProps {
    return { color: state.marblePositions![index] || 'empty' }
}

const mapDispatchToProps = (dispatch: any, { index }: OwnProps): DispatchProps => {
    return {
        onFieldClick: () => dispatch({ type: ActionType.FIELD_CLICKED, payload: { index } }),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Field);
