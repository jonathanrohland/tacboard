import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';


import Board from './Board';
import {rootReducer} from '../rootReducer';

import './App.css';

const initialState = rootReducer(undefined);


// @ts-ignore
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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