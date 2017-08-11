import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'firebase';

export var AuthSms = React.createClass({
  componentDidMount() {
    var {dispatch} = this.props;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-button', {
     'size': 'invisible',
     'callback': function(response) {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
       console.log("captcha passed, code resend");
       window.recaptchaVerifier.render().then(function(widgetId) {
          grecaptcha.reset(widgetId);
        });
     }
   });
  },
  onAuthSms() {
    var {dispatch} = this.props;
    var {code} = this.refs;

    dispatch(actions.startLogin(code.value));
  },
  sendSms() {
    var {dispatch, cel} = this.props;
    dispatch(actions.sendCode(cel, window.recaptchaVerifier));
  },
  render() {
    return (
      <div className="AuthSms">
        <h1>Sms.</h1>
        <label>Favor de ingresar el código enviado a tu número.
          <input type="number" ref="code" placeholder="12345"></input>
        </label>
        <button className="button" onClick={this.onAuthSms}>VERIFICAR</button>
        <a id="send-button" onClick={this.sendSms}>Reenviar codigo</a>
      </div>
    );
  }
});

export default Redux.connect(
  (state) => {
    return {
      cel: state.user.cel
    };
  }
)(AuthSms);
