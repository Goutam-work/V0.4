import React from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Alert,
  Row,
  Col
} from "reactstrap";
import { facebookConfig, googleConfig } from "../utils/social-config";
import { connect } from "react-redux";
import Spinner from "./Spinner/Spinner";
import * as actionCreator from "../Store/action/index";

class LoginSignupModal extends React.Component {
  state = {
    modal: true,
    activeTab: "1",
    loginEmail: "",
    loginPass: "",
    signupEmail: "",
    signupPass: "",
    signupName: ""
  };
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  loginInputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  registerInputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  registerHandler = event => {
    event.preventDefault();
    let validCheck = true;
    let message = [];
    const { signupEmail, signupName, signupPass } = this.state;

    validCheck = validCheck && signupName.length > 8 ? true : false;
    if (!validCheck)
      message.push("Username length must 6 length characters.  ");
    validCheck = validCheck && signupEmail.length > 0 ? true : false;
    if (!validCheck) message.push("Please Enter Email");
    validCheck = validCheck && signupEmail.includes("@") ? true : false;
    if (!validCheck) message.push("Invalid Email");
    validCheck = validCheck && signupPass.length > 5 ? true : false;
    if (!validCheck)
      message.push("Password length must 6 length characters.  ");

    if (!validCheck) {
      alert(message.join("\n"));
    } else {
      const { onSignup } = this.props;
      onSignup({ signupEmail, signupName, signupPass });
    }
  };
  loginHandler = event => {
    event.preventDefault();
    let validCheck = true;
    let message = [];
    const { loginEmail, loginPass } = this.state;

    validCheck = validCheck && loginEmail.length > 0 ? true : false;
    if (!validCheck) message.push("Please Enter Email");
    validCheck = validCheck && loginEmail.includes("@") ? true : false;
    if (!validCheck) message.push("Invalid Email");
    validCheck = validCheck && loginPass.length > 5 ? true : false;
    if (!validCheck)
      message.push("Password length must 6 length characters.  ");

    if (!validCheck) {
      alert(message.join("\n"));
    } else {
      const { onLogin } = this.props;
      onLogin({ loginEmail, loginPass });
    }
  };
  render() {
    const {
      loading,
      errorMessage,
      error,
      isAuthenticated,
      setLoginModal,
      isLoginModalOpen
    } = this.props;
    return (
      <div>
        <Modal isOpen={isLoginModalOpen} centered>
          <ModalHeader toggle={value => setLoginModal(false)}>
            <Container fluid>
              <Nav card>
                <NavItem className="modal-tab-nav">
                  <NavLink
                    onClick={() => {
                      this.toggleTab("1");
                    }}
                    className={
                      this.state.activeTab === "1" ? "login-tab-active" : ""
                    }
                  >
                    <h4>Login</h4>
                  </NavLink>
                </NavItem>
                <NavItem className="modal-tab-nav">
                  <NavLink
                    onClick={() => {
                      this.toggleTab("2");
                    }}
                    className={
                      this.state.activeTab === "2" ? "login-tab-active" : ""
                    }
                  >
                    <h4>Sign Up</h4>
                  </NavLink>
                </NavItem>
              </Nav>
            </Container>
          </ModalHeader>
          <ModalBody>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <Label for="login_email">Email: </Label>
                        <Input
                          type="email"
                          name="loginEmail"
                          id="login_email"
                          value={this.state.loginEmail}
                          onChange={this.loginInputHandler}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="login_pass">Password: </Label>
                        <Input
                          type="password"
                          name="loginPass"
                          id="login_pass"
                          value={this.state.loginPass}
                          onChange={this.loginInputHandler}
                        />
                      </FormGroup>
                      <Alert color="danger" isOpen={error}>
                        {errorMessage}
                      </Alert>
                      <Row className="modal-footer-elements pt-3">
                        <Col>
                          <Button
                            id="login-button"
                            onClick={this.loginHandler}
                            block
                            disabled={loading}
                          >
                            {loading ? <Spinner /> : "Login"}
                          </Button>
                        </Col>
                        <Col className="text-center">
                          or{"  "}
                          <a href="">
                            <img
                              src="images/facebook.png"
                              alt="facebook login"
                            />
                          </a>
                        </Col>
                        <Col className="text-center">
                          or{"  "}
                          <a href="">
                            <img src="images/google.png" alt="google login" />
                          </a>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <Label for="register_name">Name: </Label>
                        <Input
                          type="text"
                          name="signupName"
                          id="signup_name"
                          value={this.state.signupName}
                          onChange={this.registerInputHandler}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="register_email">Email: </Label>
                        <Input
                          type="email"
                          name="signupEmail"
                          id="signup_email"
                          value={this.state.signupEmail}
                          onChange={this.registerInputHandler}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="register_pass">Password: </Label>
                        <Input
                          type="password"
                          name="signupPass"
                          id="signup_pass"
                          value={this.state.signupPass}
                          onChange={this.registerInputHandler}
                        />
                      </FormGroup>
                      <Row className="modal-footer-elements pt-3">
                        <Col>
                          <Button
                            id="register-button"
                            block
                            onClick={this.registerHandler}
                          >
                            Register
                          </Button>
                        </Col>
                        <Col className="text-center">
                          or{"  "}
                          <a href="">
                            <img
                              src="images/facebook.png"
                              alt="facebook register"
                            />
                          </a>
                        </Col>
                        <Col className="text-center">
                          or{"  "}
                          <a href="">
                            <img
                              src="images/google.png"
                              alt="google register"
                            />
                          </a>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <Label for="forgot_email">Email: </Label>
                        <Input
                          type="email"
                          name="forogtemail"
                          id="forgot_email"
                        />
                      </FormGroup>
                      <Button id="forgot-button" block>
                        Reset Password
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <div
              onClick={() => {
                this.toggleTab("3");
              }}
              className={this.state.activeTab === "3" ? "login-tab-active" : ""}
            >
              <h6 className="text-primary modal-tab-nav">Forgot Password?</h6>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    isAuthenticated: authReducer.isLogIn,
    isLoginModalOpen: authReducer.isLoginModalOpen,
    loading: authReducer.loading,
    errorMessage: authReducer.errorMessage,
    error: authReducer.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => dispatch(actionCreator.initLoginAsync(data)),
    onSignup: data => dispatch(actionCreator.signUpAsync(data)),
    setLoginModal: value => dispatch(actionCreator.setLoginModal(value))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSignupModal);
