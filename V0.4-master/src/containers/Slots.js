import React from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import * as actionCreators from "../Store/action/index";
import idGenerator from "shortid";

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Input,
  Card
} from "reactstrap";

class Slots extends React.Component {
  state = {
    onOptionChanges: false
  };
  formatTime = time => {
    time = parseInt(time.split(":")[0]);
    if (time < 12) {
      return time + "am";
    } else if (time === 12) {
      return "12pm";
    } else {
      return time - 12 + "pm";
    }
  };

  onSportOptionChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    const id = parseInt(e.target.value);
    const obj = {
      arenaId: this.props.selectedArena,
      sportId: id
    };
    this.props.setSport({ id, name });
    this.props.fetchArenas(id);
    this.props.fetchCourts(obj);
    this.props.clearSlots();
    this.setState({
      onOptionChanges: true
    });
  };

  onArenaOptionChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    const id = parseInt(e.target.value);
    const obj = {
      arenaId: id,
      sportId: this.props.selectedSport
    };
    this.props.setArena({ id, name });
    this.props.clearSlots();
    this.props.fetchCourts(obj);
    this.setState({
      onOptionChanges: true
    });
  };
  onCourtOptionChange = e => {
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text;
    const name = text;
    const id = parseInt(e.target.value);
    this.props.setCourt({ id, name });
    // this.props.clearSlots();
    this.setState({
      onOptionChanges: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = {
      courtId: this.props.selectedCourt
    };
    this.props.clearSlots();
    this.props.fetchSlots(query);
    this.setState({
      onOptionChanges: false
    });
  };

  onClickSlotHandler = slot => {
    if (slot.selected) {
      this.props.unSetSlot(slot);
    } else {
      this.props.setSlot(slot);
    }
  };

  componentDidMount() {
    const { editCartId, editData } = this.props;

    const {
      selectedSport,
      selectedSportName,
      selectedArena,
      selectedArenaName,
      selectedCourt,
      selectedCourtName
    } = this.props;
    if (!editCartId) {
      if (!this.props.loadedSports) {
        this.props.fetchSports();
        // this.props.setSport({ id: selectedSport, name: selectedSportName });
      }
      if (!this.props.loadedArenas) {
        this.props.fetchArenas(selectedSport);
      }
      if (!this.props.loadedCourts) {
        this.props.fetchCourts({
          arenaId: selectedArena,
          sportId: selectedSport
        });
      }
      if (!this.props.loadedSlots) {
        console.log(selectedCourt, "----------[componentMount-slot]");
        this.props.fetchSlots({ courtId: selectedCourt });
      }
    } else {
      const {
        cartId,
        sportId,
        sportName,
        arenaId,
        arenaName,
        courtId,
        courtName
      } = editData;
      console.log("from edit page");
      this.props.setEditSlot(editData);
    }
  }

  onContinueToCheckout = e => {
    e.preventDefault();
    const {
      selectedCourt,
      selectedArena,
      selectedSport,
      selectedCourtName,
      selectedSportName,
      selectedArenaName,
      slotsTotalCost,
      slotsTotalDisplay,
      selectedSlot,
      editCartStore,
      editData,
      courts
    } = this.props;
    console.log(selectedSlot, typeof selectedSlot);
    let message = [];
    let checkValid = true;
    checkValid = checkValid && selectedCourt ? true : false;
    if (!checkValid) message.push("invalid Courts");
    checkValid = checkValid && selectedArena ? true : false;
    if (!checkValid) message.push("invalid Arena");
    checkValid = checkValid && slotsTotalCost ? true : false;
    if (!slotsTotalCost) message.push("invalid Total");
    checkValid = checkValid && slotsTotalDisplay ? true : false;
    if (!slotsTotalDisplay) message.push("invalid Total Display");
    checkValid = checkValid && selectedSlot.length > 0 ? true : false;
    if (!selectedSlot.length > 0) message.push("invalid Slots");
    // console.log(slotsTotalCost, slotsTotalDisplay, selectedSlot);
    const getSportId = courts.find(element => {
      return element.court_id === selectedCourt;
    });
    console.log("sport --", selectedSport);
    console.log("sport --", getSportId.sports_id);

    if (checkValid) {
      if (this.props.editCartId) {
        const obj = {
          cartId: editData.cartId,
          sportId: getSportId.sports_id,
          sportName: getSportId.sports_name,
          arenaId: selectedArena,
          arenaName: selectedArenaName,
          courtId: selectedCourt,
          courtName: selectedCourtName,
          slots: selectedSlot,
          total: slotsTotalCost,
          totalDisplay: slotsTotalDisplay,
          date: Date.now()
        };
        editCartStore(obj);
        console.log("obj", obj);
      } else {
        const obj = {
          cartId: idGenerator.generate(),
          sportId: getSportId.sports_id,
          sportName: getSportId.sports_name,
          arenaId: selectedArena,
          arenaName: selectedArenaName,
          courtId: selectedCourt,
          courtName: selectedCourtName,
          slots: selectedSlot,
          total: slotsTotalCost,
          totalDisplay: slotsTotalDisplay
        };
        this.props.addCart(obj);
      }
      this.props.clearSlots();
      this.props.clearArena();
      this.props.clearCourt();
      this.props.clearSport();
      this.props.history.push("/cart");
    } else {
      alert(message.join("\n"));
    }
  };

  render() {
    const {
      arenas,
      sports,
      courts,
      slots,
      loadedArenas,
      loadedSports,
      loadedCourts,
      loadedSlots,
      loadingSlots,
      errorSlots,
      slotsTotalCost,
      slotsTotalDisplay,
      selectedArena,
      selectedSport,
      selectedCourt
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
                key={arena.location_id + "ar4351"}
                value={`${arena.location_id}`}
              >
                {arena.ground_name}
              </option>
            );
          })
        : null;
    const courtOptionList =
      loadedCourts && courts
        ? courts.map((court, index) => {
            return (
              <option
                key={court.court_id + index + "ct741"}
                value={`${court.court_id}`}
              >
                {`${court.sports_name}-${court.court_name}`}
              </option>
            );
          })
        : null;
    //#   --------- OPTION LIST END ---------

    let slotList = <Spinner />;
    if (loadedSlots && !loadingSlots && !errorSlots && slots) {
      slotList = slots.map((element, index) => {
        return (
          <Col
            key={`${element.slot_id}-${index}-${element.slot_cost}`}
            lg="2"
            md="3"
            sm="4"
            xs="6"
            className="slot-element"
          >
            <div
              className="d-flex align-items-center"
              onClick={() => this.onClickSlotHandler(element)}
              disabled={
                element["availability"] === 1 && element["booking_status"] === 0
                  ? false
                  : true
              }
            >
              <Card
                style={{
                  borderRadius: 20,
                  padding: "10px 20px 0 20px",
                  width: "100%",
                  alignItems: "center"
                }}
                className={element.selected ? "slot-selected " : ""}
              >
                <p className="text-center">
                  <b>
                    {`${this.formatTime(
                      element.slot_start_time
                    )} to ${this.formatTime(element.slot_end_time)}`}
                  </b>
                </p>
                <p className="text-center">{`Rs ${element.slot_cost}`}</p>
              </Card>
            </div>
          </Col>
        );
      });
      if (this.state.onOptionChanges) {
        slotList = (
          <h3 className="text-info">
            Please Click on Search Button, Thank you.!
          </h3>
        );
      } else {
        if (slotList.length === 0) {
          slotList = <h3 className="text-info">Empty Slot</h3>;
        }
      }
    } else if (errorSlots && !loadingSlots) {
      slotList = <p className="text-danger">There is some error.</p>;
    }

    let totalCostDisplay = "";
    if (Object.entries(slotsTotalDisplay).length !== 0) {
      totalCostDisplay = Object.entries(slotsTotalDisplay)
        .filter(item => item[1] > 0)
        .map(item => `Rs ${item[0]}(${item[1]})`)
        .join(" + ");
    }

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
                  <option value="0">Any</option>
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
                  type="select"
                  name="Court"
                  id="court-select"
                  className="px-4"
                  onChange={this.onCourtOptionChange}
                  defaultValue={selectedCourt}
                >
                  {courtOptionList}
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
                />
              </Col>
            </FormGroup>
            <Button onClick={this.handleSubmit.bind(this)}>Search</Button>
          </Form>
        </Container>
        <h1 className="slots-section-header text-center py-3">SLOTS LIST</h1>
        <Container className="my-3">
          <Row className="flex-wrap">{slotList}</Row>
        </Container>
        <Container
          fluid
          id="slots-pay-container"
          className="d-flex align-items-center"
        >
          <h4 className="text-white text-wrap">{totalCostDisplay}</h4>
          <Button
            className="bg-light text-dark border-0 px-5 py-3 px-xs-3 py-xs-1 ml-auto"
            onClick={this.onContinueToCheckout}
          >
            <b>
              {this.props.editCartId ? "Edit " : ""}Pay Rs {slotsTotalCost}
            </b>
          </Button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({
  sportReducer,
  arenaReducer,
  courtReducer,
  slotReducer,
  cartReducer
}) => {
  return {
    sports: sportReducer.data,
    loadedSports: sportReducer.loaded,
    selectedSport: sportReducer.selectedSport,
    selectedSportName: sportReducer.selectedSportName,
    editSportSelect: sportReducer.editSportSelect,

    arenas: arenaReducer.data,
    loadedArenas: arenaReducer.loaded,
    selectedArena: arenaReducer.selectedArena,
    selectedArenaName: arenaReducer.selectedArenaName,
    courtSelectedArena: arenaReducer.courtSelectedArena,
    editArenaSelect: arenaReducer.editArenaSelect,

    courts: courtReducer.data,
    loadedCourts: courtReducer.loaded,
    selectedCourt: courtReducer.selectedCourt,
    selectedCourtName: courtReducer.selectedCourtName,
    editCourtSelect: courtReducer.editCourtSelect,

    slots: slotReducer.data,
    slotsTotalCost: slotReducer.total,
    slotsTotalDisplay: slotReducer.totalDisplay,
    loadedSlots: slotReducer.loaded,
    loadingSlots: slotReducer.loading,
    errorSlots: slotReducer.error,
    selectedSlot: slotReducer.selectedSlots,

    editCartId: cartReducer.editCartId,
    editData: cartReducer.editData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSports: query => dispatch(actionCreators.initSportAsync(query)),
    fetchArenas: query => dispatch(actionCreators.initArenaAsync({ query })),
    fetchCourts: query => dispatch(actionCreators.initCourtAsync(query)),
    fetchSlots: query => dispatch(actionCreators.initSlotAsync(query)),
    setArena: id => dispatch(actionCreators.selectArena(id)),
    setSport: id => dispatch(actionCreators.selectSport(id)),
    setCourt: id => dispatch(actionCreators.selectCourt(id)),
    setSlot: obj => dispatch(actionCreators.selectSlot(obj)),
    unSetSlot: obj => dispatch(actionCreators.deSelectSlot(obj)),
    clearSlots: () => dispatch(actionCreators.clearSlots()),
    clearArena: () => dispatch(actionCreators.clearArena()),
    clearCourt: () => dispatch(actionCreators.clearCourt()),
    clearSport: () => dispatch(actionCreators.clearSport()),

    setEditSlot: data => dispatch(actionCreators.setEditSlot(data)),

    addCart: data => dispatch(actionCreators.addToCart(data)),
    editCartStore: data => dispatch(actionCreators.editCartStore(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slots);
