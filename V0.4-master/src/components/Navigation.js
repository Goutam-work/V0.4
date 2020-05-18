import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../Store/action/index";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const { isAuthenticated, setLoginModal, userData, onLogout } = this.props;
    let loginModule = (
      <Button
        outline
        onClick={() => setLoginModal(true)}
        className="btn-outline-dark mr-4"
      >
        Login
      </Button>
    );
    if (isAuthenticated && userData) {
      const { name } = userData;
      loginModule = (
        <>
          <DropdownToggle className="dropdown-menu-button px-4" nav caret>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#333" }}
              size="1x"
              fixedWidth
            />
            <span className="user-name">{name}</span>
          </DropdownToggle>
          <DropdownMenu right className="bg-light">
            <DropdownItem href="#">My Profile</DropdownItem>
            <DropdownItem href="#">My Orders</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </>
      );
    }
    return (
      <Navbar color="light" light expand="lg" className="navigation">
        <NavLink exact to="/">
          <img
            className="navbar-brand"
            src= "images/logo.png"
            alt="PlayItUp Logo"
            width="52"
          />
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto ml-4" navbar>
            <NavItem>
              <span className="nav-link">
                <NavLink
                  exact
                  to="/"
                  style={{ color: "black" }}
                  activeStyle={{ color: "#008349" }}
                >
                  HOME
                </NavLink>
              </span>
            </NavItem>
            <NavItem>
              <span className="nav-link">
                <NavLink
                  to="/about"
                  style={{ color: "black" }}
                  activeStyle={{ color: "#008349" }}
                >
                  ABOUT US
                </NavLink>
              </span>
            </NavItem>
            <NavItem>
              <span className="nav-link">
                <NavLink
                  to="/tournaments"
                  style={{ color: "black" }}
                  activeStyle={{ color: "#008349" }}
                >
                  TOURNAMENTS
                </NavLink>
              </span>
            </NavItem>
            <NavItem>
              <span className="nav-link">
                <NavLink
                  to="/partner"
                  style={{ color: "black" }}
                  activeStyle={{ color: "#008349" }}
                >
                  PARTNER WITH US
                </NavLink>
              </span>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink
                to="/cart"
                activeStyle={{ boderBottom: "1px solid #008349" }}
              >
                <span className="nav-link cart-icon ml-4">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ color: "#333" }}
                    size="lg"
                    fixedWidth
                  />
                </span>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              {loginModule}
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = ({ authReducer }) => {
  return {
    isAuthenticated: authReducer.isLogIn,
    isLoginModalOpen: authReducer.isLoginModalOpen,
    userData: authReducer.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    isLogined: () => dispatch(actionCreator.isLoginCheck()),
    setLoginModal: value => dispatch(actionCreator.setLoginModal(value)),
    onLogout: () => dispatch(actionCreator.onLogout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
