import React from "react";

import {
  faInstagram,
  faFacebookF,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import { Container } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container mt-4 navbar-static-bottom">
        <div className="overline"></div>
        <footer>
          <Container className="text-white">
            <div className="footer-left">
              <h3>
                <img src={logo} alt="PlayItUp Logo" />
                Play It Up !
              </h3>
            </div>
            <div className="footer-right">
              <h3 className="underline">Follow Us</h3>
              <div className="social-icons">
                <a href="https://twitter.com">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    fixedWidth
                    size="1x"
                    style={{ color: "#fff" }}
                  />
                </a>
                <a href="https://facebook.com">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    fixedWidth
                    size="1x"
                    style={{ color: "#fff" }}
                  />
                </a>
                <a href="https://instagram.com">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    fixedWidth
                    size="1x"
                    style={{ color: "#fff" }}
                  />
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="text-center text-white">
                &copy; 2019 PlayItUp. All Rights Reserved.
              </p>
            </div>
          </Container>
        </footer>
      </div>
    );
  }
}
