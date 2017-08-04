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

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked', result);
    }, (error) => {
      console.log('Unable to auth', error);
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
