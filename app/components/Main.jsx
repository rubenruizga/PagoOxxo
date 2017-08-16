import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';
import RegisterForm from 'RegisterForm';

export var Main = React.createClass({
  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  },
  render() {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>

        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell medium-2"></div>
            <div className="cell medium-8"><RegisterForm/></div>
            <div className="cell medium-2"></div>
          </div>
        </div>
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
)(Main);
