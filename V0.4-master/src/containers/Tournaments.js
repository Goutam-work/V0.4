import React, { Component } from "react";
import TournamentCard from "../components/Tournament-Card";

export default class Tournaments extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center my-3 tournaments-section-header mb-5">
          TOURNAMENTS
        </h1>
        <div className="container">
          <TournamentCard
            name="Cricket Tournament"
            date="10 Oct 2019"
            last="08 Oct 2019"
          />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
