import React from "react";
import { Card, CardImg, CardSubtitle, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../Store/action/index";

class ArenaCard extends React.Component {
  onClickHandle = () => {
    this.props.onSelectArena({ id: this.props.id, name: this.props.name });
  };

  render() {
    return (
      <Card className="my-3 mx-1">
        <Link to="/court" className="card-name" onClick={this.onClickHandle}>
          <CardImg
            top
            width="100%"
            src={"images/arenas/" + this.props.img + ".png"}
            alt={this.props.name}
          />
          <CardBody>
            <h4>{this.props.name}</h4>

            <CardSubtitle className="text-secondary">
              {this.props.location}
            </CardSubtitle>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

const mapStateToProps = ({ arenaReducer }) => {
  return {
    arenas: arenaReducer.data,
    loadedArenas: arenaReducer.loaded,
    loadingArenas: arenaReducer.loading,
    errorArenas: arenaReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectArena: obj => dispatch(actionCreators.selectArena(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArenaCard);
