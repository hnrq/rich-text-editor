import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { editorReducer } from 'reducers/editorReducer';
import thunk from 'redux-thunk';
import socketMiddleware from 'middleware/socketMiddleware';

export default function configureStore(initialState = {}) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(socketMiddleware(), thunk));

  return createStore(combineReducers({ editorReducer }), enhancer);
}
