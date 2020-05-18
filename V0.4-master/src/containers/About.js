import React from "react";
import { Container } from "reactstrap";

export default class About extends React.Component {
  render() {
    return (
      <Container className="about-page">
        <section id="about-us" className="my-5">
          <h1 className="about-us-header text-center  my-3">ABOUT US</h1>
          <p className="text-center">
            Going with the age-old proverb of{" "}
            <b> "All work and no play makes Jack a dull boy"</b> Play It Up !
            comes to the forefront as an engaging platform promoting sports
            integrity . Be it a fitness enthusiast or martial artist , be it an
            ardent cricket fan or a novice wanting to learn how to shoot his
            first goal , we bring the best sports organization of the city
            together and present an aggregate model so that you can See , Learn
            and Book yourself a session in just 1 tap ! To add a cherry on the
            top , one can also track and register for all the upcoming and live
            tournaments that will be hosted in the city .
          </p>
        </section>
        <section id="booking-arena-slots" className="my-5">
          <h1 className="about-us-header text-center my-3">
            BOOKING ARENA SLOTS
          </h1>
          <p className="text-center">
            It’s not your game to play if you are sitting idle and swiping right
            and left on your screen. Use it for something better! Book yourself
            an arena to come down and play! Drop some sweat on the field. You
            can book your slot under any category- daily, weekly or monthly
            under minimal charges.
          </p>
        </section>
        <section id="booking-arena-slots" className="my-5">
          <h1 className="about-us-header text-center my-3">
            ORGANISING TOURNAMENTS
          </h1>
          <p className="text-center">
            An idea that brings together hosts, organisers and players to
            collaborate and organise a mini sports fest. So if you’re looking to
            conduct an event be that be any game of any genre, Play It Up! is
            there to help you with every step. It’s not just it, you can even
            enrolled for all the ongoing and upcoming tournaments too!
          </p>
        </section>
      </Container>
    );
  }
}
