import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../style/ToDoList.css";
import ListItem from "./ListItem";
import ListItemInput from "./ListItemInput";
import PlaceHolderItem from "./LoadingItem";
import * as DB from "../handlers/dbHandler";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    DB.getItems().then(items => {
      this.updateItems(items);
    });
    this.state = {
      items: [],
      add: false,
      placeholder: { isPresent: true, value: "Loading..." }
    };
  }

  updateItems = items => {
    this.setState({ placeholder: { isPresent: false } });
    this.setState({ items });
  };

  itemClickHandler = item => {
    let items = [...this.state.items];
    let cur_item = { ...items[items.indexOf(item)] };
    cur_item.done = !item.done;
    DB.updateItem(cur_item).then(res => {
      if (!res) {
        cur_item.done = item.done;
        items[items.indexOf(item)] = cur_item;
        this.setState({ items });
      }
    });
    items[items.indexOf(item)] = cur_item;
    this.setState({ items });
  };

  listClickHandler = () => {
    if (this.state.placeholder.isPresent) return;
    let stat = this.state.add;
    this.setState({ add: !stat });
  };

  closeHandler = item => {
    let tmpItems = this.state.items.map(s_item => {
      if (s_item === item) {
        s_item.className = "deleting";
        s_item.value = "deleting...";
      }
      return s_item;
    });
    this.setState({ items: tmpItems });
    DB.deleteItem(item._id).then(res => {
      let newItems;
      if (res)
        newItems = tmpItems.filter(cur_item => {
          return item !== cur_item;
        });
      else
        newItems = tmpItems.map(cur_item => {
          if (cur_item === item) cur_item.value = item.value;
          cur_item.className = "";
          return cur_item;
        });
      this.setState({ items: newItems });
    });
  };

  addHandler = async text => {
    if (text.length === 0) return;
    this.setState({ placeholder: { isPresent: true, value: "Loading..." } });
    const { items } = this.state;
    DB.createNewItem(text).then(item => {
      let newItems = [...items];
      newItems.push(item);
      this.setState({ placeholder: { isPresent: false } });
      this.setState({ items: newItems });
    });
  };

  clearItems = () => {
    let tmpItems = this.state.items;
    this.setState({
      items: [],
      placeholder: { isPresent: true, value: "Clearing..." }
    });
    DB.clearItems().then(res => {
      if (res === false) this.setState({ items: tmpItems });
      else this.setState({ placeholder: { isPresent: false } });
    });
  };

  addingItemOn = bool => {
    this.setState({ add: bool });
  };

  updateDatabase = states => {};

  renderItems = () => {
    return this.state.items.map(item => {
      return (
        <ListItem
          className={item.className}
          key={item._id}
          item={item}
          onClick={this.itemClickHandler}
          onClose={this.closeHandler}
        />
      );
    });
  };

  renderPlaceholder = () => {
    const { isPresent, value } = this.state.placeholder;
    if (isPresent) return <PlaceHolderItem placeholder={value} />;
  };

  renderInput = () => {
    if (this.state.add)
      return (
        <ListItemInput
          onAdd={this.addHandler}
          unmount={() => {
            this.addingItemOn(false);
          }}
        />
      );
  };

  render() {
    return (
      <div className="container todo-body card h-75 bg-dark text-white">
        <div className="header">
          <h3>To-Do List</h3>
        </div>
        <div className="container-fluid border-bottom">
          <h5 className="d-inline">Items:</h5>
          <button
            onClick={this.clearItems}
            className="btn btn-danger float-right"
          >
            Clear
          </button>
          <button
            onClick={this.addingItemOn}
            className="btn btn-primary float-right mr-3"
          >
            Add
          </button>
        </div>
        <div
          className="container-fluid overflow-scroll mt-3 p-0 h-100 "
          onClick={this.listClickHandler}
        >
          {this.renderItems()}
          {this.renderPlaceholder()}
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

export default ToDoList;
