import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';
import FirebaseActions from 'FirebaseActions';

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

        <h1 className="page-title">React to Main</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <FirebaseActions/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Main);
