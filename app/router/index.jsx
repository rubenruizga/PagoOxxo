var React = require('react');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import AuthSms from 'AuthSms'
import firebase from 'app/firebase/';
import Main from 'Main';
import Welcome from 'Welcome';

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
      <Route path="authsms" component={AuthSms}/>
      <IndexRoute component={Welcome} onEnter={redirectIfLoggedin}/>
    </Route>
  </Router>
);
