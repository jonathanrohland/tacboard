import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import Board from './Board';
import { rootReducer } from '../rootReducer';
import { getWebsocket } from '../Websocket';

import './App.css';
import { ActionType } from '../actions';

import { initI18n } from '../i18n';
import { getLocationHash, isValidGameId, updateHashWithGameId } from '../url_utils';
import { GameId } from '../types';
import { useTranslation } from 'react-i18next';

const initialState = rootReducer(undefined);

// @ts-ignore
const store = createStore(rootReducer, initialState, composeWithDevTools());

const webSocket = getWebsocket();

webSocket.onmessage = (event => {
  console.log('Received Data:', event.data);
  const eventData = JSON.parse(event.data);
  if (eventData.marblePositions) {
    const nextMarblePositions = eventData.marblePositions;
    console.log('Updating marblePositions from socket-message', nextMarblePositions);

    store.dispatch({
      type: ActionType.UPDATE_FROM_SERVER,
      payload: {
        marblePositions: nextMarblePositions
      }
    })
  } else {
    console.log('Received unhandlable socket event with data:', eventData);
  }
})

initI18n();

function App() {
  const { t } = useTranslation();

  const locationHash = getLocationHash();
  console.log('Location hash:', locationHash);
  let gameId: GameId | null = null;

  if (isValidGameId(locationHash)) {
    console.log('Found valid game id in location-hash', locationHash);
    gameId = locationHash;
  }

  while (!gameId || !isValidGameId(gameId)) {
    gameId = prompt(t('game-id-prompt'), "");
  }
  console.log('Set game id from prompt', gameId);

  updateHashWithGameId(gameId);
  store.dispatch({
    type: ActionType.SET_GAME_ID,
    payload: {
      gameId
    }
  })

  return (
    <div className="App">
      <Provider store={store}>
        <Board />
      </Provider>
    </div>
  );
}

export default App;