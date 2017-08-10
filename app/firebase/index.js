import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyDTyPkVDNjMUh_Lig9VK4IUcC46UTdQJmM",
    authDomain: "registrosd-21846.firebaseapp.com",
    databaseURL: "https://registrosd-21846.firebaseio.com",
    projectId: "registrosd-21846",
    storageBucket: "registrosd-21846.appspot.com",
    messagingSenderId: "208081336359"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
