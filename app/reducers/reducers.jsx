var uuid = require('node-uuid');
var moment = require('moment');

export var firebaseReducer = (state = [], action) => {
  switch (action.type) {
    case 'TEST_ACTION':
      return ({
        ...sate,
        text: "text"
      });

    case 'ADD_DATA':
      return [
        ...state,
        action.data
      ];
    case 'LOGOUT':
      return [];
      break;
    default:
      return state;
  }
};

export var userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return  ({
        birthyear: action.data.birthyear,
        cel: action.data.cel,
        email: action.data.email,
        gender: action.data.gender,
        name: action.data.name,
        school: action.data.school,
        size: action.data.size
      });
    case 'SET_PHONE':
      return  ({
        cel: action.cel
      });
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return [];
      break;
    default:
      return state;
  }
}
