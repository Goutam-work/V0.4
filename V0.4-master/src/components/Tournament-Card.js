import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

export default class TournamentCard extends React.Component {
  render() {
    return (
      <Card className="my-4">
        <CardBody>
          <Row className="text-center">
            <Col
              md={{ size: 3, order: 1 }}
              sm={{ size: 6, order: 1 }}
              xs="12"
              className="card-sp"
            >
              <h3>{this.props.name}</h3>
            </Col>
            <Col
              md={{ size: 3, order: 2 }}
              sm={{ size: 6, order: 2 }}
              xs="12"
              className="card-sp"
            >
              <span>
                <b>Tournament Date:</b>
                <br />
                {this.props.date}
              </span>
            </Col>
            <Col
              md={{ size: 3, order: 3 }}
              sm={{ size: 6, order: 4 }}
              xs="12"
              className="card-sp"
            >
              <span>
                <b>Last Date for Registration: </b>
                <br />
                {this.props.last}
              </span>
            </Col>
            <Col
              md={{ size: 3, order: 4 }}
              sm={{ size: 6, order: 3 }}
              xs="12"
              className="card-sp"
            >
              <button className="btn btn-block" id="card-btn-register">
                Register
              </button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
