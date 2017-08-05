import * as redux from 'redux';
import thunk from 'redux-thunk';

import {firebaseReducer, authReducer, userReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    user: userReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
