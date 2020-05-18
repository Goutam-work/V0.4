import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Store/action/index";

import { Container, Col, Form, FormGroup, Button, Input } from "reactstrap";
import CourtList from "../components/CourtList";

class Court extends React.Component {
  onSportOptionChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    const id = parseInt(e.target.value);
    this.props.setSport({ id, name });
    this.props.fetchArenas(id);
    // const query = {
    //   sportId: id,
    //   arenaId: this.props.selectedArena
    // };
    // this.props.fetchCourts(query);
  };

  onArenaOptionChange = e => {
    const id = parseInt(e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    this.props.setArena({ id, name });
    // const query = {
    //   sportId: this.props.selectedSport,
    //   arenaId: id
    // };
    // this.props.fetchCourts(query);
  };
  handleSubmit = e => {
    e.preventDefault();
    const query = {
      sportId: this.props.selectedSport,
      arenaId: this.props.selectedArena
    };
    this.props.fetchCourts(query);
  };

  componentDidMount() {
    if (!this.props.loadedSports) {
      this.props.fetchSports();
    }
    if (!this.props.loadedArenas) {
      this.props.fetchArenas();
    }
    // loadedCourts
    if (true) {
      const query = {
        sportId: this.props.selectedSport,
        arenaId: this.props.selectedArena
      };
      this.props.fetchCourts(query);
    }
  }

  render() {
    const {
      arenas,
      loadedArenas,
      selectedArena,
      selectedSport,
      sports,
      loadedSports
    } = this.props;
    //#  HERE LIST OF SPORTS OPTION FOR DROPDOWN
    const sportOptionList =
      loadedSports && sports
        ? sports.map(sport => {
            return (
              <option
                key={sport.sports_id + "sp4441"}
                value={`${sport.sports_id}`}
              >
                {sport.sports_name}
              </option>
            );
          })
        : null;
    const arenaOptionList =
      loadedArenas && arenas
        ? arenas.map(arena => {
            return (
              <option
                key={arena.location_id + "ar57441"}
                value={`${arena.location_id}`}
              >
                {arena.ground_name}
              </option>
            );
          })
        : null;
    //#   --------- OPTION LIST END ---------

    return (
      <div>
        <Container fluid className="searchbar-holder py-3">
          <Form inline>
            <FormGroup row>
              <Col lg={4} sm={12} xs={12}>
                <Input
                  type="select"
                  name="Sport"
                  id="sport-select"
                  className="px-4"
                  onChange={this.onSportOptionChange}
                  defaultValue={selectedSport ? selectedSport : "0"}
                >
                  <option value="0">ALL SPORTS</option>
                  {sportOptionList}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg={4} sm={12} xs={12}>
                <Input
                  type="select"
                  name="Arena"
                  id="arena-select"
                  className="px-4"
                  onChange={this.onArenaOptionChange}
                  defaultValue={selectedArena}
                >
                  {arenaOptionList}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg={4} sm={12} xs={12}>
                <Input
                  type="date"
                  name="date"
                  id="bookingDate"
                  className="px-4"
                  placeholder="date"
                />
              </Col>
            </FormGroup>
            <Button onClick={this.handleSubmit.bind(this)}>Search</Button>
          </Form>
        </Container>
        <CourtList
          sportSelected={this.props.selectedSport}
          arenaSelected={this.props.selectedArena}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ sportReducer, arenaReducer, courtReducer }) => {
  return {
    sports: sportReducer.data,
    loadedSports: sportReducer.loaded,
    selectedSport: sportReducer.selectedSport,

    arenas: arenaReducer.data,
    loadedArenas: arenaReducer.loaded,
    selectedArena: arenaReducer.selectedArena,
    selectedArenaName: arenaReducer.selectedArenaName,
    courtSelectedArena: arenaReducer.courtSelectedArena,

    courts: courtReducer.data,
    loadedCourts: courtReducer.loaded,
    selectedCourt: courtReducer.selectedCourt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSports: query => dispatch(actionCreators.initSportAsync(query)),
    fetchArenas: query => dispatch(actionCreators.initArenaAsync({ query })),
    fetchCourts: query => dispatch(actionCreators.initCourtAsync(query)),
    setArena: obj => dispatch(actionCreators.selectArena(obj)),
    setSport: obj => dispatch(actionCreators.selectSport(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Court);
