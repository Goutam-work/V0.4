import React from "react";

import {
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Container,
  Row,
  Col
} from "reactstrap";

export default class Partner extends React.Component {
  render() {
    return (
      <Container className="mt-3 mb-5 partner-page">
        <h1 className="text-center py-3 partner-section-header">
          PARTNER WITH US
        </h1>
        <Form className="col-lg-6 offset-lg-3">
          <FormGroup>
            <Label for="name">Name*</Label>
            <Input
              type="text"
              className="form-control"
              id="name"
              placeholder="John Doe"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Label for="phone1">Phone 1*</Label>
                <Input
                  type="tel"
                  className="form-control"
                  id="phone1"
                  placeholder="+91 999 999 9999"
                  required
                />
              </Col>
              <Col>
                <Label for="phone2">Phone 2</Label>
                <Input
                  type="tel"
                  className="form-control"
                  id="phone2"
                  placeholder="+91 999 999 9999"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>Join As: *</Label>
            <Row>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Academy"
                  id="academy"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Sports Hub"
                  id="sportshub"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Organizer"
                  id="organizer"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Trainer/Coach"
                  id="trainer"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Label>Sports: *</Label>
            <Row>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Cricket"
                  id="cricket"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Football"
                  id="football"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Swimming"
                  id="swimming"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Snooker"
                  id="snooker"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Badminton"
                  id="badminton"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Basketball"
                  id="basketball"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Climbing"
                  id="climbing"
                />
              </Col>
              <Col lg="3" sm="6" xs="12">
                <CustomInput
                  className="custom-control-Input"
                  type="checkbox"
                  label="Gym"
                  id="gym"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <button id="submit-form" className="btn btn-block">
              Join
            </button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
