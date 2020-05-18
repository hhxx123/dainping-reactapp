import React, { Component } from "react";
import "../../index.css";
import ErrorToast from "../../components/ErrorToast";
import { actions as appActions, getError } from "../../redux/modules/app";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../Home"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      error,
      appActions: { clearError },
    } = this.props;
    return (
      <div className="App">
        <Home />
        {error ? (
          <ErrorToast msg={error} clearError={clearError}></ErrorToast>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
