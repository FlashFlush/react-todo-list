import React, { Component } from "react";
class PlaceHolderItem extends Component {
  render() {
    return (
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "large" }}
      >
        <p>{this.props.placeholder}</p>
      </div>
    );
  }
}

export default PlaceHolderItem;
