import React from "react";
import axios from "axios";

var selectedId, selectedTask;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:4001/tasks")
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          tasks: [...response.results],
        });
      });
  };

  formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/tasks", {
        todo: e.target.todo.value,
      })
      .then((response) => {
        this.setState({
          tasks: [...this.state.tasks, { task: e.target.todo.value }],
        });
      });
    console.log(this.state.tasks);
  };

  taskDelete = (id, e) => {
    axios.delete(`http://localhost:4001/tasks/${id}`);
  };

  taskSelect(task, id, e) {
    document.getElementById("new-todo-input").value = task;
    selectedId = id;
    selectedTask = document.getElementById("new-todo-input").value;
  }

  taskUpdate(id, e) {
    id = selectedId;
    const updatedTask = {
      task: document.getElementById("new-todo-input").value,
    };
    console.log(`I am pogi * ${id}`);
    axios
      .put(`http://localhost:4001/tasks/${id}`, updatedTask)
      .then((response) =>
        this.setState({
          task: response.data.selectedTask,
          updatedAt: response.data.updatedAt,
        })
      );
  }

  render() {
    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <form onSubmit={this.formSubmit}>
          <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
              What needs to be done?
            </label>
          </h2>
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="todo"
            autoComplete="off"
          />
          <button type="submit" className="btn btn__primary btn__lg">
            Add
          </button>
        </form>
        <button
          onClick={() => {
            this.taskUpdate(selectedTask);
          }}
          className="btn btn__primary btn__lg">
          Update
        </button>
        <div className="filters btn-group stack-exception">
          <button type="button" className="btn toggle-btn" aria-pressed="true">
            <span className="visually-hidden">Show </span>
            <span>all</span>
            <span className="visually-hidden"> tasks</span>
          </button>
          <button type="button" className="btn toggle-btn" aria-pressed="false">
            <span className="visually-hidden">Show </span>
            <span>Active</span>
            <span className="visually-hidden"> tasks</span>
          </button>{" "}
          {/* <button type="button" className="btn toggle-btn" aria-pressed="false">
            <span className="visually-hidden">Show </span>
            <span>Completed</span>
            <span className="visually-hidden"> tasks</span>
          </button> */}
        </div>
        <h2 id="list-heading">3 tasks remaining</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
          {this.state.tasks.map((task, index) => {
            return (
              <li key={index}>
                {task.task}
                {task.id}

                <button
                  onClick={() => {
                    this.taskDelete(task.id);
                  }}>
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    this.taskSelect(task.task, task.id, e);
                  }}>
                  Select
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
