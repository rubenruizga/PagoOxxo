var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var FirebaseActions = React.createClass({
  render: function () {
    var {dispatch} = this.props;

    return (
      <div className="container__header">
        <button type="button" className="button expanded" onClick={() => {
            dispatch(actions.startReading("Text from FirebaseActions"));
          }}>Read</button>
        <button type="button" className="button expanded" onClick={() => {
            dispatch(actions.startWriting("Text from FirebaseActions"));
          }}>Write</button>
      </div>
    )
  }
});

export default connect()(FirebaseActions);
