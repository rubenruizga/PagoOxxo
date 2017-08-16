var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var RegisterForm = React.createClass({
  onSend(e){
    e.preventDefault();
    var {dispatch, uid = ''} = this.props;
    var {birthyear, cel, email, gender, name, school, size} = this.refs;
    var volunteer = {birthyear: birthyear.value, cel: cel.value, email: email.value, gender: gender.value, name: name.value, school: school.value, size: size.value}
    console.log(volunteer);
    dispatch(actions.startWriting(volunteer, uid));
  },
  onGender(e){
    console.log(e.currentTarget.value);
    var gender = document.getElementById('gender');
    gender.value = e.currentTarget.value;
  },
  onSize(e){
    console.log(e.currentTarget.value);
    var size = document.getElementById('size');
    size.value = e.currentTarget.value;
  },
  render: function () {
    var {dispatch, birthyear = '', cel = '', email = '', gender = 'Hombre', name = '', school = '', size = 'S', uid = ''} = this.props;
    var volunteerData = () => {
      return (
        <div>
          <input id="size" ref="size" type="hidden" defaultValue={size}></input>
          <input id="gender" ref="gender" type="hidden" defaultValue={gender}></input>
          <input ref="cel" type="number" placeholder="6141611841" defaultValue={cel}></input>
          <input ref="name" type="text" placeholder="Nombre" defaultValue={name}></input>
          <input ref="email" type="email" placeholder="john@gmail.com" defaultValue={email}></input>
          <input type="radio" name="gender" value="Hombre" defaultChecked={gender === "Hombre"} onChange={this.onGender}></input><label htmlFor="Hombre">Hombre</label>
          <input type="radio" name="gender" value="Mujer" defaultChecked={gender === "Mujer"} onChange={this.onGender}></input><label htmlFor="Mujer">Mujer</label>
          <input ref="birthyear" type="number" placeholder="1999" defaultValue={birthyear}></input>
          <input ref="school" type="text" placeholder="Hogwarts" defaultValue={school}></input>
          <label>Talla</label>
          <input type="radio" name="size" value="S" defaultChecked={size === "S"} required onChange={this.onSize}></input><label htmlFor="S">S</label>
          <input type="radio" name="size" value="M" defaultChecked={size === "M"} onChange={this.onSize}></input><label htmlFor="M">M</label>
          <input type="radio" name="size" value="L" defaultChecked={size === "L"} onChange={this.onSize}></input><label htmlFor="L">L</label>
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
      uid: state.user.uid
    };
  }
)(RegisterForm);
