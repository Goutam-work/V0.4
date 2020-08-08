import React from "react";
import { connect } from "react-redux";
import ArenaList from "../components/ArenaList";
import * as actionCreators from "../Store/action/index";

import { Container, Col, Form, FormGroup, Button, Input } from "reactstrap";

class Arena extends React.Component {
  state = {
    sportSelected: 0,
    arenaSelected: 0,
    arena: [],
    sports: []
  };
  onSportOptionChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    const id = parseInt(e.target.value);
    this.props.setSports({
      id: id,
      name: name
    });
    this.props.fetchArenas(parseInt(e.target.value));
  };
  onDateChange = e => {
    let newDate = e.nativeEvent.target.value;
    this.props.setDate(newDate);
  };
  handleSubmit = e => {
    e.preventDefault();
    // getArenaFromSportID(this.state.sportSelected).then(arena =>
    //   this.setState({ arena })
    // );
  };

  componentDidMount() {
    if (!this.props.loadedSports) {
      this.props.fetchSports();
    }
    if (!this.props.loadedArenas) {
      this.props.fetchArenas();
    }
    if (!this.props.selectedDate) {
      console.log(selectedDate, "----------[componentMount-date]");
      let datetime = new Date();
      datetime = datetime.toISOString().slice(0,10);
      this.props.setDate(datetime);
    }
  }
  render() {
    const {
      // arenas,
      // loadedArenas,
      // loadingArenas,
      // errorArenas,
      selectedSport,
      // selectedSportName,
      sports,
      loadedSports,
      selectedDate
    } = this.props;
    //#  HERE LIST OF SPORTS OPTION FOR DROPDOWN
    const sportOptionList =
      loadedSports && sports
        ? sports.map(sport => {
            return (
              <option
                key={sport.sports_id + "sp4441"}
                value={`${sport.sports_id}`}
                data-name={sport.sports_name}
              >
                {sport.sports_name}
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
                  defaultValue={selectedSport}
                >
                  <option value="0">Any Sport</option>
                  {sportOptionList}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg={4} sm={6} xs={12}>
                <Input
                  type="date"
                  name="date"
                  id="bookingDate"
                  className="px-4"
                  placeholder="date"
                  onChange={this.onDateChange}
                  value={selectedDate}
                />
              </Col>
            </FormGroup>
            <Button onClick={this.handleSubmit.bind(this)}>Search</Button>
          </Form>
        </Container>
        <ArenaList />
      </div>
    );
  }
}

const mapStateToProps = ({ sportReducer, arenaReducer ,slotReducer}) => {
  return {
    sports: sportReducer.data,
    loadedSports: sportReducer.loaded,
    selectedSport: sportReducer.selectedSport,
    
    arenas: arenaReducer.data,
    loadedArenas: arenaReducer.loaded,
    loadingArenas: arenaReducer.loading,
    errorArenas: arenaReducer.error,

    selectedDate: slotReducer.selectedDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArenas: query => dispatch(actionCreators.initArenaAsync({ query })),
    fetchSports: () => dispatch(actionCreators.initSportAsync()),
    setSports: obj => dispatch(actionCreators.selectSport(obj)),
    setDate: datetime => dispatch(actionCreators.setDate(datetime))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Arena);
