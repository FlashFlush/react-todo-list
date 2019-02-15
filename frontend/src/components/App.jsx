import React from "react";

import ToDoList from "./TodoListComp/ToDoList";
import "./../style/app.css";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid content mt-5">
        <ToDoList />
      </div>
    );
  }
}

export default App;
