import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Color } from '../types';
import './House.css';
import { ActionType } from '../actions';


type OwnProps = {
    color: Color;
}

// type StateProps = {
//     color: Color | 'empty'
// }

type DispatchProps = {
    onHouseClick: () => {}
}

type Props = OwnProps & DispatchProps;


function Field(props: Props) {
    return <div onClick={props.onHouseClick} className={classnames("house", `house--${props.color.toString()}`)} />
}

// function mapStateToProps(state: State, { index }: OwnProps): StateProps {
//     return { color: state.marblePositions![index] || 'empty' }
// }

const mapDispatchToProps = (dispatch: any, { color }: OwnProps): DispatchProps => {
    return {
        onHouseClick: () => dispatch({ type: ActionType.HOUSE_CLICKED, payload: { color } }),
    }
}

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(Field);
