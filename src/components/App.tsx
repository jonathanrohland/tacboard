import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import Board from './Board';
import { rootReducer } from '../rootReducer';
import { getWebsocket } from '../Websocket';

import './App.css';
import { ActionType } from '../actions';

const initialState = rootReducer(undefined);

// @ts-ignore
const store = createStore(rootReducer, initialState, composeWithDevTools());

const webSocket = getWebsocket();

webSocket.onmessage = (event => {
  console.log('Received Data:', event.data)
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

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Board />
      </Provider>
    </div>
  );
}

export default App;