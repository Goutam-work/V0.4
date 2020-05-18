import React from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import * as actionCreators from "../Store/action/index";

import SportCard from "../components/SportCard";
import ArenaList from "../components/ArenaList";

import { Container, Row, Col } from "reactstrap";

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.loadedSports) {
      this.props.fetchSports();
    }
    this.props.onSelectSport(0);
    this.props.clearSlots();
    this.props.clearArena();
    this.props.clearCourt();
    this.props.setCartStore({ value: null, data: null });
  }
  onSelectSportHandler = (id, name) => {
    this.props.onSelectSport({ id, name });
    this.props.fetchArenas(id);
    this.props.history.push("/arena");
  };
  render() {
    const { loadedSports, loadingSports, errorSports, sports } = this.props;

    let sportList = <Spinner />;
    if (loadedSports && !loadingSports && !errorSports && sports) {
      sportList = sports.map((element, index) => {
        return (
          <Col
            key={element["sports_id"]}
            md="3"
            sm="6"
            xs="12"
            className="add-margin-sport-box"
            onClick={() =>
              this.onSelectSportHandler(
                element["sports_id"],
                element["sports_name"]
              )
            }
          >
            <SportCard
              src={element["sports_name"]}
              text={element["sports_name"]}
            />
          </Col>
        );
      });
    } else if (errorSports && !loadingSports) {
      sportList = <p className="text-danger">Error loading sports...</p>;
    }

    return (
      <div>
        <section id="header">
          <div id="header-img">
            <Container>
              <h1>Stop At Nothing..</h1>
              <p className="mt-3">
                Etiam dignissim diam quis enim lobortis. Egestas sed sed risus
                pretium quam vulputate dignissim. Eleifend quam adipiscing vitae
                proin sagittis. Pharetra pharetra massa massa ultricies.
                Elementum eu facilisis sed odio morbi. Morbi tincidunt augue
                interdum velit.
              </p>
            </Container>
          </div>
        </section>

        <section id="available-sports">
          <h1 className="available-sports-section-header text-center py-3">
            AVAILABLE SPORTS
          </h1>
          <Container>
            <Row>{sportList}</Row>
          </Container>
        </section>

        <section id="easy-steps-section">
          <Container fluid>
            <h1 className="text-white py-3 easy-steps-section-header">
              Three very easy steps
            </h1>
            <Row>
              <Col sm>
                <div className="text-white text-center border rounded-lg py-4">
                  1. Choose your Sport
                </div>
              </Col>
              <Col sm>
                <div className="text-white text-center border rounded-lg py-4">
                  2. Choose your desired Arena
                </div>
              </Col>
              <Col sm>
                <div className="text-white text-center border rounded-lg py-4">
                  3. Choose your Date and time
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="arena-list">
          <ArenaList fromHome={true} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ sportReducer }) => {
  // console.log("here", sportReducer);
  return {
    sports: sportReducer.data,
    loadedSports: sportReducer.loaded,
    loadingSports: sportReducer.loading,
    errorSports: sportReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSports: () => dispatch(actionCreators.initSportAsync()),
    onSelectSport: obj => dispatch(actionCreators.selectSport(obj)),
    fetchArenas: query => dispatch(actionCreators.initArenaAsync({ query })),
    clearSlots: () => dispatch(actionCreators.clearSlots()),
    clearArena: () => dispatch(actionCreators.clearArena()),
    clearCourt: () => dispatch(actionCreators.clearCourt()),
    clearSport: () => dispatch(actionCreators.clearSport()),

    setCartStore: value => dispatch(actionCreators.setCartStore(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
