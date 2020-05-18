import React from "react";
import ArenaCard from "./ArenaCard";
import { connect } from "react-redux";
import Spinner from "./Spinner/Spinner";
import * as actionCreators from "../Store/action/index";

import { Container, Row, Col } from "reactstrap";

class ArenaList extends React.Component {
  state = {
    arena: [],
    selectedArena: 0
  };

  componentDidMount() {
    if (this.props.fromHome) {
      this.props.fetchArenas();
    }
  }

  handleClick = (index, event) => {
    event.preventDefault();
    // this.props.getSelectedArena(index);
  };
  render() {
    const {
      arenas,
      loadedArenas,
      loadingArenas,
      errorArenas,
      selectedSportName
      // sports,
      // loadedSports
    } = this.props;
    let arenaList = <Spinner />;
    if (loadedArenas && !loadingArenas && !errorArenas && arenas) {
      arenaList = arenas.map((element, index) => {
        return (
          <Col lg="3" md="4" sm="6" xs="12" key={element.location_id}>
            <ArenaCard
              id={element.location_id}
              name={element.ground_name}
              location={element.lane_name}
              img={element.location_id}
            />
          </Col>
        );
      });
    } else if (errorArenas && !loadingArenas) {
      arenaList = <p>There is something error.</p>;
    }
    return (
      <Container>
        <h1 className="py-3 section-header text-center all-arena-section-header">
          {selectedSportName ? selectedSportName : "ALL ARENAS"}
        </h1>
        <Row>{arenaList}</Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ sportReducer, arenaReducer }) => {
  return {
    sports: sportReducer.data,
    loadedSports: sportReducer.loaded,
    selectedSport: sportReducer.selectedSport,
    selectedSportName: sportReducer.selectedSportName,
    arenas: arenaReducer.data,
    loadedArenas: arenaReducer.loaded,
    loadingArenas: arenaReducer.loading,
    errorArenas: arenaReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArenas: query => dispatch(actionCreators.initArenaAsync({ query }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArenaList);
