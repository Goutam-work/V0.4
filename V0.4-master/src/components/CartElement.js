import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

export default class CartElement extends React.Component {
  render() {
    let sport_image_url = `images/sports/${this.props.sport}.png`;
    return (
      <Card className="cart-element">
        <CardBody>
          <Row className="text-center">
            <Col md={{ size: 3, order: 1 }} sm={{ size: 6, order: 1 }} xs="12">
              {console.log(this.props.sport)}
              <img src={sport_image_url} alt="slot-img"></img>
              <h5 className="mt-2">{this.props.sport}</h5>
            </Col>
            <Col md={{ size: 3, order: 2 }} sm={{ size: 6, order: 2 }} xs="12">
              <h5>
                <b>Arena:</b>
              </h5>
              <span className="arena-name">{this.props.arena}</span>
              <h5>
                <b>Date:</b>
              </h5>
              {this.props.bookingDate}
            </Col>
            <Col md={{ size: 3, order: 3 }} sm={{ size: 6, order: 4 }} xs="12">
              <h5>
                <b>Slot Timings:</b>
                <br />
              </h5>
              {this.props.slots}
            </Col>
            <Col md={{ size: 3, order: 4 }} sm={{ size: 6, order: 3 }} xs="12">
              <button
                className="btn btn-block"
                id="cart-btn-edit"
                onClick={this.props.edit}
              >
                Edit
              </button>
              <button
                className="btn btn-block"
                id="cart-btn-delete"
                onClick={this.props.remove}
              >
                Delete
              </button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
