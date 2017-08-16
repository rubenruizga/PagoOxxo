import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
var {hashHistory} = require('react-router');

var URL = 'https://us-central1-registrosd-21846.cloudfunctions.net/bigben';

export var testAction = (id) => {
  return {
    type: 'TEST_ACTION',
    id
  };
};

export var addData= (data) => {
  return {
    type: 'ADD_DATA',
    data
  };
};

export var getUser = (cel) => {
  return (dispatch, getState) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL,
      "method": "GET",
      "headers": {
        "cel": cel
        }
      };
    $.ajax(settings).done( (response) => {
      if (Object.keys(response).length !== 0) {
        dispatch(setUser(response));
      } else {
        console.log('new');
        dispatch(setPhone(cel));
        dispatch(setNew());
      }
      hashHistory.push('/main');
    });
  };
};

export var setPhone = (cel) => {
  return {
    type: 'SET_PHONE',
    cel
  };
};

export var setNew = () => {
  return {
    type: 'SET_NEW',
  };
};

export var setUser = (data) => {
  return {
    type: 'SET_USER',
    data
  };
};

export var startWriting = (volunteer, uid) => {
  return (dispatch, getState) => {
    var add = getState().new;
    var fetchedVol = getState().user;
    delete fetchedVol.uid;
    console.log(volunteer);
    if (add) {
      var volRef = firebaseRef.child('voluntarioss').push(volunteer);
      volRef.then(() => {
        console.log('saved');
      });
    } else {
      if (volunteer != fetchedVol) {
        console.log('need to be updated');
        var volRef = firebaseRef.child('voluntarioss').update(volunteer);
        volRef.then(() => {
          console.log('updated');
        });
      }
    }
    var dataRef = firebaseRef.child('carrera2017').push(volunteer);
    dataRef.then(() => {
      console.log('saved');
    });
  };
};

export var startReading = (text) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var dataRef = firebaseRef.child(`users/${uid}/data`)

    return dataRef.once('value').then((snapshot) => {
      var data =snapshot.val() || {};
      var parsedData = [];

      Object.keys(data).forEach((dataId) => {
        parsedData.push({
          id: dataId,
          ...data[dataId]
        });
      });

      dispatch(addData(parsedData));
    });


    Object.keys()
    dataRef.then(() => {
      dispatch(addData({
        ...data,
        id: dataRef.key
      }));
    });
  };
};

export var sendCode = (celInput, appVerifier) => {
  return (dispatch, getState) => {
    var countryCode = '+52';
    var celNumber = countryCode.concat(celInput.toString());
    firebase.auth().signInWithPhoneNumber(celNumber, appVerifier)
     .then(function (confirmationResult) {
       // SMS sent. Prompt user to type the code from the message, then sign the
       // user in with confirmationResult.confirm(code).
       window.confirmationResult = confirmationResult;
       console.log('Mensaje enviado al ',celNumber);
     }).catch(function (error) {
       // Error; SMS not sent
       // ...
       console.log(error);
     });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = (code) => {
  return (dispatch, getState) => {
    confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
      firebase.auth().signInWithCredential(credential);

      console.log("User authenticated");
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.log(error, "startLogin action");
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};
