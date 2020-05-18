import React from "react";

class SportCard extends React.Component {
  render() {
    return (
      <div className="sport-box">
        <img src={"images/sports/" + this.props.src + ".png"} className="sport-box-img" alt="sport field" />
        <span className="sport-box-text">{this.props.text}</span>
      </div>
    );
  }
}

export default SportCard;
