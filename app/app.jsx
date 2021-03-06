var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase';
import router from 'app/router';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var cel = user.phoneNumber;
    cel = parseInt(cel.substring(3));
    store.dispatch(actions.getUser(cel));
    store.dispatch(actions.login(user.uid));
    //hashHistory.push('/main');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
