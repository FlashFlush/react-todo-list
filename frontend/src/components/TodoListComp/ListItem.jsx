import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../style/ListItem.css";
class ListItem extends Component {
  handlerClose = e => {
    e.stopPropagation();
    this.props.onClose(this.props.item);
  };

  handlerClick = e => {
    e.stopPropagation();
    this.props.onClick(this.props.item);
  };

  getClasses = done => {
    return (
      "bg-secondary mb-1 text-center border rounded list-item  " +
      (done ? "done border-success " : "border-secondary ") +
      (this.props.className !== undefined ? this.props.className : "")
    );
  };

  render() {
    const { done, value } = this.props.item;

    return (
      <div className={this.getClasses(done)} onClick={this.handlerClick}>
        <p className="d-inline">{value}</p>
        <button
          type="button"
          onClick={this.handlerClose}
          className="close m-0"
          aria-label="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default ListItem;
