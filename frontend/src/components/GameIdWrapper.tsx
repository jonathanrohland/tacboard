import React from 'react';
import { connect } from 'react-redux';

import { State, GameId } from '../types';
import LandingPage from './LandingPage';
import Board from './Board';


type StateProps = {
    gameId?: GameId,
}

type Props = StateProps;

function renderBoard() {
    return <Board />
}

function renderLandingPage() {
    return <LandingPage />
}


function GameIdWrapper(props: Props) {
    if (props.gameId) {
        return renderBoard();
    }
    return renderLandingPage();
}

function mapStateToProps(state: State): StateProps {
    return {
        gameId: state.gameId
    }
}

export default connect<StateProps, {}, {}>(mapStateToProps)(GameIdWrapper);
