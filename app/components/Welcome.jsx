import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';
var {hashHistory} = require('react-router');

export var Welcome = React.createClass({
  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
     'size': 'invisible',
     'callback': function(response) {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
       console.log("captcha passed");
       hashHistory.push('/AuthSms');
     }
   });
  },
  onWelcome() {
    var {dispatch} = this.props;
    var {celInput} = this.refs;
    dispatch(actions.setPhone(celInput.value));
    dispatch(actions.sendCode(celInput.value, window.recaptchaVerifier));
  },
  render() {
    return (
      <div className="welcome">
        <h1>Soñar Despierto</h1>
        <h3>¡Bienvenido!</h3>
        <h5>En Soñar Despierto nos preocupamos por tu seguridad, por lo que ahora es necesario que verifiques tu identidad por medio de tu numero de telefono. Despues de introducir tu numero reciviras un mensja de texto con el codigo de verificacion.</h5>
        <label>Tu numero de celular
          <input type="number" ref="celInput" placeholder="6141234565"></input>
        </label>
        <button id="sign-in-button" className="button" onClick={this.onWelcome}>ENVIAR CODIGO</button>
      </div>
    );
  }
});

export default Redux.connect()(Welcome);
