import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Color, State } from '../types';
import './House.css';
import { ActionType } from '../actions';


type OwnProps = {
    color: Color;
}

type StateProps = {
    isPickedUp: boolean
}

type DispatchProps = {
    onHouseClick: () => {}
}

type Props = OwnProps & StateProps & DispatchProps;


function Field(props: Props) {
    return <div onClick={props.onHouseClick} className={classnames("house", `house--${props.color.toString()}`, props.isPickedUp ? 'house--picked-up' : null)} />
}

function mapStateToProps(state: State, { color }: OwnProps): StateProps {
    return {
        isPickedUp: state.pickedUpMarble?.field === null && state.pickedUpMarble?.color === color
    }
}

const mapDispatchToProps = (dispatch: any, { color }: OwnProps): DispatchProps => {
    return {
        onHouseClick: () => dispatch({ type: ActionType.HOUSE_CLICKED, payload: { color } }),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Field);
