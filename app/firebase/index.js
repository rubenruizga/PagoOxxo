import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyBUioYtW5GaAEZNUEE3wgVKfrbQUf6Nmos",
    authDomain: "webapps-2262c.firebaseapp.com",
    databaseURL: "https://webapps-2262c.firebaseio.com",
    projectId: "webapps-2262c",
    storageBucket: "webapps-2262c.appspot.com",
    messagingSenderId: "493309489055"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
