import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';

export var AuthSms = React.createClass({
  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
     'size': 'invisible',
     'callback': function(response) {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
       console.log("captcha passed");
       hashHistory.push('/signupsms');
     }
   });
  },
  onAuthSms() {
    var {dispatch} = this.props;
    var {phoneInput} = this.refs;

    dispatch(actions.sendCode(phoneInput.value, window.recaptchaVerifier));
  },
  render() {
    return (
      <div className="AuthSms">
        <h1>Sms</h1>
        <label>Tu numero de celular
          <input type="number" ref="phoneInput" placeholder="12345"></input>
        </label>
        <button id="sign-in-button" className="button" onClick={this.onAuthSms}>VERIFICAR</button>
      </div>
    );
  }
});

export default Redux.connect()(AuthSms);
