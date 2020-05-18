import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Store/action/index";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Input,
  Form
} from "reactstrap";
import CartElement from "../components/CartElement";

class Mycart extends React.Component {
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
  editCartItemHandler = obj => {
    const {
      editSport,
      editCourt,
      editArena,
      setCartStore,
      fetchSports,
      fetchArenas,
      fetchCourts,
      fetchSlots
    } = this.props;
    const {
      cartId,
      sportId,
      sportName,
      arenaId,
      arenaName,
      courtId,
      courtName
    } = obj;

    fetchSports({ id: sportId, name: sportName });
    fetchArenas(sportId, { id: arenaId, name: arenaName });
    fetchCourts({ arenaId, sportId }, { id: courtId, name: courtName });
    fetchSlots({ courtId }, obj.slots);
    setCartStore({ value: cartId, data: obj });
    this.props.history.push("/slots");
  };
  makeListOfCarts = () => {
    const { data, removeFromCart } = this.props;
    const arrayList = data.map((element, index) => {
      let slots_list = element.slots
        .map((obj, index) => {
          return `${this.formatTime(obj.slot_start_time)} to ${this.formatTime(
            obj.slot_end_time
          )}`;
        })
        .join(", ");
      return (
        <CartElement
          key={element.cartId}
          sport={element["sportName"]}
          arena={element["arenaName"]}
          slots={slots_list}
          edit={() => this.editCartItemHandler(element)}
          remove={() => removeFromCart(element.cartId)}
        />
      );
    });
    return arrayList;
  };
  checkoutHandler = () => {
    const { isAuthenticated, data, setLoginModal } = this.props;
    if (isAuthenticated) {
      alert(data.join("\n"));
    } else {
      setLoginModal(true);
      alert("You're not authenticated");
    }
  };
  componentDidMount() {
    this.props.clearSlots();
    this.props.clearArena();
    this.props.clearCourt();
    this.props.clearSport();
  }
  render() {
    const { data, validData, clearCart } = this.props;
    // console.log(sport, court, arena, data);
    let cart = <p className="text-center">Empty Cart</p>;
    if (validData) {
      cart = this.makeListOfCarts();
    }
    let sum_price = 0;
    if (data != null) {
      sum_price = data.map(x => x.total).reduce((a, b) => a + b, 0);
    }
    return (
      <Container fluid className="mt-5">
        <h1 className="my-cart-header mb-5 text-center">My Cart</h1>
        <Button onClick={clearCart} className="px-5" id="clear-cart">
          Empty Cart
        </Button>
        <Row>
          <Col lg={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
            {cart}
          </Col>
          <Col
            lg={{ size: 4, order: 2 }}
            xs={{ size: 12, order: 1 }}
            className="my-3"
          >
            <Card className="px-4">
              <CardTitle className="d-inline-flex pt-3">
                <span className="total-price">
                  <b>Sum Total:</b>
                </span>
                <span className="ml-auto total-cost">
                  <b>Rs {sum_price}</b>
                </span>
              </CardTitle>
              <hr />
              <CardBody className="px-0">
                <span className="font-weight-normal">Add Coupon?</span>
                <Form className="mb-5">
                  <Input type="test" name="coupon-code" id="couponCode" />
                  <Input type="submit" hidden />
                </Form>
              </CardBody>
              <CardFooter className="mt-5 pb-3">
                <span className="total-price text-dark">
                  <b>Final Price: </b>
                </span>
                <span className="float-right total-cost">
                  <b>Rs {sum_price}</b>
                </span>

                <Button
                  block
                  id="checkout-btn"
                  onClick={this.checkoutHandler}
                  className="mt-2"
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ cartReducer, authReducer }) => {
  return {
    data: cartReducer.data,
    validData: cartReducer.validData,
    isAuthenticated: authReducer.isLogIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: id => dispatch(actionCreators.removeFromCart(id)),
    clearCart: () => dispatch(actionCreators.clearCart()),
    setLoginModal: value => dispatch(actionCreators.setLoginModal(value)),

    clearSlots: () => dispatch(actionCreators.clearSlots()),
    clearArena: () => dispatch(actionCreators.clearArena()),
    clearCourt: () => dispatch(actionCreators.clearCourt()),
    clearSport: () => dispatch(actionCreators.clearSport()),

    fetchSports: query => dispatch(actionCreators.initSportAsync(query)),
    fetchArenas: (query, obj) =>
      dispatch(actionCreators.initArenaAsync({ query, obj })),
    fetchCourts: (query, obj) =>
      dispatch(actionCreators.initCourtAsync(query, obj)),
    fetchSlots: (query, value) =>
      dispatch(actionCreators.initSlotAsync(query, value)),

    editSport: value => dispatch(actionCreators.editSport(value)),
    editCourt: value => dispatch(actionCreators.editCourt(value)),
    editArena: value => dispatch(actionCreators.editArena(value)),
    setCartStore: value => dispatch(actionCreators.setCartStore(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mycart);
