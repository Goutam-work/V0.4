import React from "react";
import CourtCard from "./CourtCard";
import { connect } from "react-redux";
import Spinner from "./Spinner/Spinner";
import * as actionCreators from "../Store/action/index";

import { Container, Row, Col } from "reactstrap";

class CourtList extends React.Component {
  state = {};

  componentDidMount() {
    if (!this.props.loadedCourts) {
      const queryObj = {
        arenaId: this.props.arenaSelected,
        sportId: this.props.sportSelected
      };
      this.props.fetchCourts(queryObj);
    }
  }

  handleClick = (index, event) => {
    event.preventDefault();
    // this.props.getSelectedArena(index);
  };
  render() {
    const {
      courts,
      loadedCourts,
      loadingCourt,
      // selectedCourt,
      selectedArenaName,
      errorCourt
    } = this.props;
    let courtsList = <Spinner />;
    if (loadedCourts && !loadingCourt && !errorCourt && courts) {
      courtsList = courts.map((element, index) => {
        return (
          <Col lg="3" md="6" sm="12" key={element.court_id}>
            <CourtCard
              courtId={element.court_id}
              courtName={element.court_name}
              locationId={element.location_id}
              sportId={element.sports_id}
              sportName={element.sports_name}
              img={element.sports_name}
            />
          </Col>
        );
      });
      if (courtsList.length === 0) {
        courtsList = <h3>Empty Court</h3>;
      }
    } else if (errorCourt && !loadingCourt) {
      courtsList = <p>There is something error.</p>;
    }
    return (
      <Container>
        <h1 className="py-3 section-header text-center all-arena-section-header">
          {selectedArenaName ? selectedArenaName : "ALL COURTS"}
        </h1>
        <Row>{courtsList}</Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ sportReducer, arenaReducer, courtReducer }) => {
  return {
    // sports: sportReducer.data,
    // loadedSports: sportReducer.loaded,
    // selectedSport: sportReducer.selectedSport,

    // arenas: arenaReducer.data,
    // loadedArenas: arenaReducer.loaded,
    selectedArenaName: arenaReducer.selectedArenaName,

    courts: courtReducer.data,
    loadedCourts: courtReducer.loaded,
    selectedCourt: courtReducer.selectedCourt,
    errorCourt: courtReducer.error,
    loadingCourt: courtReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCourts: query => dispatch(actionCreators.initCourtAsync(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourtList);
