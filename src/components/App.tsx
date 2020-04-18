import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import { rootReducer } from '../rootReducer';
import { getWebsocket } from '../Websocket';

import { ActionType } from '../actions';
import { GameId } from '../types';

import { initI18n } from '../i18n';
import { getLocationHash, isValidGameId, updateHashWithGameId } from '../url_utils';

import GameIdWrapper from './GameIdWrapper';
import './App.css';


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

function updateGameIdFromHash() {
  const locationHash = getLocationHash();
  console.log('Location hash:', locationHash);
  let gameId: GameId | null = null;

  if (isValidGameId(locationHash)) {
    console.log('Found valid game id in location-hash', locationHash);
    gameId = locationHash;

    updateHashWithGameId(gameId);
    store.dispatch({
      type: ActionType.SET_GAME_ID,
      payload: {
        gameId
      }
    })
  } else {
    store.dispatch({
      type: ActionType.CLEAR_GAME_ID,
    })
  }
}

window.onpopstate = () => {
  console.log('window.history', window.history);
  updateGameIdFromHash();
}

function App() {
  updateGameIdFromHash();

  return (
    <div className="App">
      <Provider store={store}>
        <GameIdWrapper />
      </Provider>
    </div>
  );
}

export default App;