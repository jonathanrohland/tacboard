import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';


import Board from './Board';
import {rootReducer, initialState} from '../rootReducer';

import './App.css';

const store = createStore(rootReducer, initialState)

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