import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class ListItemInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  clickHandler = e => {
    e.stopPropagation();
  };

  componentWillUnmount() {
    this.props.onAdd(this.state.value);
  }

  updateInput = e => {
    this.setState({ value: e.target.value });
  };

  handleKey = e => {
    if (e.key === "Enter") this.props.unmount();
  };

  render() {
    return (
      <div className="input-group" onClick={this.clickHandler}>
        <div className="input-group-prepend">
          <span className="input-group-text">Item:</span>
        </div>
        <input
          value={this.state.value}
          onChange={this.updateInput}
          autoFocus
          onKeyDown={this.handleKey}
          className="form-control"
          placeholder="Your item..."
          type="text"
          name="item"
          id="item"
        />
      </div>
    );
  }
}

export default ListItemInput;
