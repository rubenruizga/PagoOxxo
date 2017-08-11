var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var RegisterForm = React.createClass({
  render: function () {
    var {dispatch, birthyear  = '', cel = '', email = '', gender = '', name = '', school = '', size = '', uid = ''} = this.props;
    var volunteerData = () => {
      return (
        <div>
          <input ref="cel" type="number" placeholder="6141611841" defaultValue={cel}></input>
          <input ref="name" type="text" placeholder="Nombre" value={name}></input>
          <input ref="email" type="email" placeholder="john@gmail.com" value={email}></input>
          <input type="radio" ref="gender" value="Hombre" checked={gender === "Hombre"}></input><label htmlFor="Hombre">Hombre</label>
          <input type="radio" ref="gender" value="Mujer" checked={gender === "Mujer"}></input><label htmlFor="Mujer">Mujer</label>
          <input ref="birthyear" type="number" placeholder="1999" value={birthyear}></input>
          <input ref="school" type="text" placeholder="Hogwarts" value={school}></input>
          <label>Talla</label>
          <input type="radio" ref="size" value="S" checked={size === "S"} required></input><label htmlFor="S">S</label>
          <input type="radio" ref="size" value="M" checked={size === "M"}></input><label htmlFor="M">M</label>
          <input type="radio" ref="size" value="L" checked={size === "L"}></input><label htmlFor="L">L</label>
        </div>
      );
    };
    return (
      <div>
        <form>
          <fieldset className="fieldset">
            <legend>Tu informacion</legend>
            {volunteerData()}
          </fieldset>
          <button type="button" className="button expanded" onClick={this.onSend}>REGISTRARME</button>
        </form>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      birthyear: state.user.birthyear,
      cel: state.user.cel,
      email: state.user.email,
      gender: state.user.gender,
      name: state.user.name,
      school: state.user.school,
      size: state.user.size,
      uid: state.auth.uid
    };
  }
)(RegisterForm);
