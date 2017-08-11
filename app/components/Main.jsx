import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';
import RegisterForm from 'RegisterForm';

export var Main = React.createClass({
  componentDidMount() {
    var {dispatch, cel} = this.props;
    if (cel != null) {
      dispatch(actions.getUser());
    }
  },
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

        <h1 className="page-title">React to Main</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <RegisterForm/>
            </div>
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
