import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../Store/action/index";
import "../scss/main.scss";
import "bootstrap/scss/bootstrap.scss";

import Home from "./Home";
import Arena from "./Arena";
import Tournaments from "./Tournaments";
import Partner from "./Partner";
import About from "./About";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Court from "./Court";
import Slots from "./Slots";
import Mycart from "./Mycart";

import LoginSignupModal from "../components/LoginSignupModal";

class App extends React.Component {
  componentDidMount() {
    const { isLogined } = this.props;
    isLogined();
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="wrapper d-flex flex-column sticky-footer-wrapper">
        <Navigation />
        <div className="flex-fill">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/arena" component={Arena} />
            <Route path="/about" component={About} />
            <Route path="/slots" component={Slots} />
            <Route path="/court" component={Court} />
            <Route path="/cart" component={Mycart} />
            {!isAuthenticated ? (
              <Route path="/login" component={LoginSignupModal} />
            ) : null}
            <Route path="/partner" component={Partner} />
            <Route path="/tournaments" component={Tournaments} />
          </Switch>
        </div>
        <Footer />
        {!isAuthenticated ? <LoginSignupModal /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    isAuthenticated: authReducer.isLogIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    isLogined: () => dispatch(actionCreator.isLoginCheck()),
    plzLogout: () => dispatch(actionCreator.onLogout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
