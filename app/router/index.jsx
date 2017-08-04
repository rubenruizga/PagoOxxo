var React = require('react');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import Login from 'Login';
import Main from 'Main';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
      replace('/');
    }
    next();
};

var redirectIfLoggedin = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
      replace('/main');
    }
    next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="main" component={Main} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedin}/>
    </Route>
  </Router>
);
