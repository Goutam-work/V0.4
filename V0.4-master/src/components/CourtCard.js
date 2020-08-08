import React from "react";
import { Card, CardImg, CardSubtitle, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/action/index";

class CourtCard extends React.Component {
  onClickHandle = () => {
    const obj = {
      id: this.props.courtId,
      name: this.props.courtName
    };
    this.props.onSelectCourt(obj);
    this.props.clearSlots();
  };

  render() {
    return (
      <Card className="my-3 mx-1">
        <Link to="/slots" className="card-name" onClick={this.onClickHandle}>
          <CardImg
            className="w-50 d-block mx-auto pt-2"
            src={"images/sports/" + this.props.img + ".png"}
            alt={this.props.courtName}
          />
          <CardBody>
            <h4 className="court-name">{this.props.courtName}</h4>

            <CardSubtitle>{this.props.sportName}</CardSubtitle>
            <CardSubtitle className="text-secondary">Book Now</CardSubtitle>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    clearSlots: () => dispatch(actionCreators.clearSlots()),
    onSelectCourt: id => dispatch(actionCreators.selectCourt(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourtCard);
