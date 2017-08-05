import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

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

export var setPhone = (phone) => {
  return {
    type: 'SET_PHONE',
    phone
  };
};

export var startWriting = (text) => {
  return (dispatch, getState) => {
    var data = {
      text,
      name: "Ruben",
      admin: true,
      age: 23,
      email: "e9.ruben@gmail.com"
    };
    var uid = getState().auth.uid;
    var dataRef = firebaseRef.child(`users/${uid}/data`).push(data);

    dataRef.then(() => {
      dispatch(addData({
        ...data,
        id: dataRef.key
      }));
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

export var sendCode = (phoneInput, appVerifier) => {
  return (dispatch, getState) => {
    var countryCode = '+52';
    var phoneNumber = countryCode.concat(phoneInput.toString());
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
     .then(function (confirmationResult) {
       // SMS sent. Prompt user to type the code from the message, then sign the
       // user in with confirmationResult.confirm(code).
       window.confirmationResult = confirmationResult;
       console.log('Mensaje enviado al ',phoneNumber);
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
