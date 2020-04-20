import React, { useRef } from 'react';

import './LandingPage.css';
import { useTranslation } from 'react-i18next';
import { isValidGameId, updateHashWithGameId } from '../url_utils';
import { GameId } from '../types';
import { ActionType } from '../actions';
import { connect } from 'react-redux';
import Footer from './Footer';

type DispatchProps = {
    setGameId: (gameId: GameId) => void;
}

type Props = DispatchProps;

function LandingPage(props: Props) {
    const { t } = useTranslation();
    const gameIdInput = useRef<HTMLInputElement>(null);

    function startGame() {
        const inputValue = gameIdInput.current?.value;
        if (inputValue && isValidGameId(inputValue)) {
            updateHashWithGameId(inputValue);
            props.setGameId(inputValue);
        } else {
            window.alert(t('landing-page__input-error'));
        }
    }

    return (
        <div className="landing-page">
            <div className="landing-page__container">
                <h1>{t('landing-page__header')}</h1>
                <p> {t('landing-page__explanation')}</p>

                <form className="landing-page__form" onSubmit={startGame}>
                    <input className="landing-page__game-id-input" type="text" ref={gameIdInput}></input>
                    <button type="submit" className="landing-page__start-button">{t('landing-page__start-game')}</button>
                </form>

            </div>
            <Footer />
        </div>
    );
}


const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        setGameId: (gameId) => dispatch({
            type: ActionType.SET_GAME_ID,
            payload: {
                gameId
            },
        }),
    }
}

export default connect<{}, DispatchProps>(undefined, mapDispatchToProps)(LandingPage);
