import React, { Component } from "react";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      date: "",
      time: "",
      category: "Spor",
      status: "To Do",
      todo: "",
      token: "",
    };
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };
  addTodo = () => {
    let temp = this.state.date.split("-");
    let inputDate = `${temp[2]}.${temp[1]}.${temp[0]}`;
    let data = {
      title: this.state.title,
      content: this.state.content,
      date: inputDate,
      time: this.state.time,
      category: this.state.category,
      status: this.state.status,
    };
    let authToken = localStorage.getItem("token");
    fetch("http://localhost:5000/api/todos/todoAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(true);
  };
  render() {
    return (
      <div
        className="modal fade"
        id="inputModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Task
              </h5>
              <button
                type="button"
                style={{ backgroundColor: "#333", border: "none" }}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i
                  className="fa-solid fa-circle-xmark"
                  style={{ fontSize: "24px", color: "white" }}
                ></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={(event) => {
                      this.onChangeHandler(event);
                    }}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    placeholder="Enter To Do Title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <input
                    onChange={(event) => {
                      this.onChangeHandler(event);
                    }}
                    type="text"
                    className="form-control"
                    name="content"
                    id="content"
                    placeholder="Enter To Do Content"
                  />
                </div>
                <div className="form-group d-flex justify-content-between">
                  <div className="col-7">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      onChange={(event) => {
                        this.onChangeHandler(event);
                      }}
                      id="date"
                      type="date"
                      name="date"
                      className="form-control"
                      aria-describedby="btnAddNewTask"
                      max=""
                      min=""
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="time" className="form-label">
                      Time
                    </label>
                    <input
                      onChange={(event) => {
                        this.onChangeHandler(event);
                      }}
                      id="time"
                      type="time"
                      name="time"
                      className="form-control"
                      aria-describedby="btnAddNewTask"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    onChange={(event) => {
                      this.onChangeHandler(event);
                    }}
                    id="category"
                    name="category"
                    className="form-control"
                  >
                    <option defaultValue={"Spor"}>Spor</option>
                    <option>Shop</option>
                    <option>Work</option>
                    <option>Family</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    onChange={(event) => {
                      this.onChangeHandler(event);
                    }}
                    id="status"
                    name="status"
                    className="form-control"
                  >
                    <option defaultValue={"To Do"}>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Close
              </button>
              <button
                onClick={() => {
                  this.addTodo();
                }}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-dark"
              >
                <i className="fa-solid fa-floppy-disk"></i> Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
