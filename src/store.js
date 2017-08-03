import { compose, createStore } from 'redux';

import rootReducer from './reducers/index';

import { newBoard } from './components/Board';

const initialState = {
  board: newBoard(),
}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, initialState, enhancers);

export default store;
