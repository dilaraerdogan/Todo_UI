import React, { Component } from "react";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarTitles: [
        { title: "all", id: 1, active: true },
        { title: "active", id: 2, active: false },
        { title: "completed", id: 3, active: false },
        { title: "today", id: 4, active: false },
      ],
      todoList: [],
      token: "",
      editTodo: "",
      title: "",
      content: "",
      date: "",
      time: "",
      category: "Spor",
      status: "To Do",
    };
  }
  componentDidMount() {
    this.getAllTodo();
  }

  getActiveTab = async () => {
    let authToken = localStorage.getItem("token");

    let response = await fetch("http://localhost:5000/api/todos/active", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
    });
    let result = await response.json();
    if (result.success) {
      this.setState({ todoList: result.data, token: authToken });
    } else {
      console.log("error");
    }
  };

  getCompletedTab = async () => {
    let authToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:5000/api/todos/completed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
    });
    let result = await response.json();
    if (result.success) {
      this.setState({ todoList: result.data, token: authToken });
    } else {
      console.log("error");
      //window.location.replace("http://localhost:3000/");
    }
  };

  getAllTodo = async () => {
    let authToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:5000/api/todos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
    });
    let result = await response.json();
    if (result.success) {
      this.setState({ todoList: result.data, token: authToken });
    } else {
      window.location.replace("http://localhost:3000/");
    }
  };
  getTodayTodo = async () => {
    let authToken = localStorage.getItem("token");

    let response = await fetch("http://localhost:5000/api/todos/today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
    });
    let result = await response.json();
    if (result.success) {
      this.setState({ todoList: result.data, token: authToken });
    } else {
      console.log("error");
    }
  };

  currentTab = (params) => {
    let changeTab = this.state.navbarTitles.map((navbar) => {
      if (navbar.id === params) {
        return {
          title: navbar.title,
          id: navbar.id,
          active: true,
        };
      } else {
        return {
          title: navbar.title,
          id: navbar.id,
          active: false,
        };
      }
    });
    switch (params) {
      case 1:
        this.getAllTodo();
        break;
      case 2:
        this.getActiveTab();
        break;
      case 3:
        this.getCompletedTab();
        break;
      case 4:
        this.getTodayTodo();
        break;
      default:
        break;
    }
    this.setState({ navbarTitles: changeTab });
  };

  deleteTodo = async (deleteId) => {
    let authToken = localStorage.getItem("token");

    let response = await fetch(
      `http://localhost:5000/api/todos/${deleteId}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer: ${authToken}`,
        },
      }
    );
    let currentTabId;
    this.state.navbarTitles.forEach((navbarItem) => {
      if (navbarItem.active) {
        currentTabId = navbarItem.id;
        return;
      }
    });
    this.currentTab(currentTabId);
  };

  getCategoryIcon = (category) => {
    switch (category) {
      case "Spor":
        return "fa-solid fa-volleyball";
      case "Family":
        return "fa-solid fa-house";
      case "Shop":
        return "fa-solid fa-cart-shopping";
      case "Work":
        return "fa-solid fa-briefcase";
      case "Other":
        return "fa-solid fa-ellipsis";
      default:
        return "fa-solid fa-ellipsis";
    }
  };

  currentEditTodo = (todo) => {
    let temp = todo.date.split(".");
    let changeDate = `${temp[2]}-${temp[1]}-${temp[0]}`;
    this.setState({
      title: todo.title,
      content: todo.content,
      date: changeDate,
      time: todo.time,
      category: todo.category,
      status: todo.status,
      editTodo: todo,
    });
  };

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  updateTodo = async () => {
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
    let id = this.state.editTodo._id;
    let authToken = localStorage.getItem("token");

    let response = await fetch(`http://localhost:5000/api/todos/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    if (response.success) {
      let tab = this.state.navbarTitles.find((e) => e.active === true);
      switch (tab.id) {
        case 1:
          this.getAllTodo();
          break;
        case 2:
          this.getActiveTab();
          break;
        case 3:
          this.getCompletedTab();
          break;
        case 4:
          this.getTodayTodo();
          break;
        default:
          break;
      }
    }
  };
  render() {
    return (
      <div>
        <section className="col-12 d-flex flex-column align-items-center">
          <div className="col-md-11 col-12 navbar-div">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {this.state.navbarTitles.map((navbar) => {
                return (
                  <button
                    onClick={() => this.currentTab(navbar.id)}
                    key={navbar.id}
                    className={
                      navbar.active
                        ? "nav-link nav-item my-active text-uppercase "
                        : "nav-link nav-item text-uppercase"
                    }
                    id={"nav-" + navbar.title + "-tab"}
                    data-bs-toggle="tab"
                    data-bs-target={"#nav-" + navbar.title}
                    type="button"
                    role="tab"
                    aria-controls={"nav-" + navbar.title}
                    aria-selected="true"
                  >
                    {navbar.title}
                  </button>
                );
              })}
            </div>
            <div className="tab-content col-12" id="nav-tabContent">
              {/* All Todo */}
              <div
                className="tab-pane fade active show"
                id="nav-all"
                role="tabpanel"
                aria-labelledby="nav-all-tab"
              >
                <div className="all-todo col-12">
                  <div className="todo-title col-12">
                    <div className="col-2 text-center text-uppercase">
                      Status
                    </div>
                    <div className="col-6 text-uppercase">Content</div>
                    <div className="col-2 text-center text-uppercase">
                      Category
                    </div>
                    <div className="col-1 text-uppercase">Timeline</div>
                    <div className="col-1 text-center text-uppercase"> </div>
                  </div>
                  {this.state.todoList.length === 0 ? (
                    <div className="text-center text-danger">
                      There is no data for this tab.
                    </div>
                  ) : (
                    this.state.todoList.map((todo, index) => {
                      return (
                        <div
                          key={todo._id}
                          className={
                            index % 2 === 0 ? "todo-item odd" : "todo-item"
                          }
                        >
                          <div className="col-2 d-flex justify-content-center text-center">
                            <div
                              className={
                                todo.status.toLowerCase().replace(" ", "-") +
                                " col-8"
                              }
                            >
                              {todo.status}
                            </div>
                          </div>
                          <div className="col-6 content">
                            <p className="title">{todo.title}</p>
                            <p className="description">{todo.content}</p>
                          </div>
                          <div className="col-2 text-center category">
                            {" "}
                            <i
                              className={this.getCategoryIcon(todo.category)}
                            ></i>{" "}
                            {todo.category}
                          </div>
                          <div className="col-1 text-center timeline">
                            {todo.date} <br /> {todo.time}
                          </div>
                          <div className="col-1 text-center btn d-flex justify-content-around">
                            <button
                              type="button"
                              className="btn "
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              onClick={() => {
                                this.currentEditTodo(todo);
                              }}
                            >
                              <i className="fa-solid fa-pencil update"></i>
                            </button>
                            <button
                              onClick={() => {
                                this.deleteTodo(todo._id);
                              }}
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <i className="fa-solid fa-trash delete"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              {/* Active  */}
              <div
                className="tab-pane fade"
                id="nav-active"
                role="tabpanel"
                aria-labelledby="nav-active-tab"
              >
                <div className="all-todo col-12">
                  <div className="todo-title col-12">
                    <div className="col-2 text-center text-uppercase">
                      Status
                    </div>
                    <div className="col-6 text-uppercase">Content</div>
                    <div className="col-2 text-center text-uppercase">
                      Category
                    </div>
                    <div className="col-1 text-uppercase">Timeline</div>
                    <div className="col-1 text-center text-uppercase"> </div>
                  </div>
                  {this.state.todoList.length === 0 ? (
                    <div className="text-center text-danger my-5 fs-5">
                      There is no data for this tab.
                    </div>
                  ) : (
                    this.state.todoList.map((todo, index) => {
                      return (
                        <div
                          key={todo._id}
                          className={
                            index % 2 === 0 ? "todo-item odd" : "todo-item"
                          }
                        >
                          <div className="col-2 d-flex justify-content-center text-center">
                            <div
                              className={
                                todo.status.toLowerCase().replace(" ", "-") +
                                " col-8"
                              }
                            >
                              {todo.status}
                            </div>
                          </div>
                          <div className="col-6 content">
                            <p className="title">{todo.title}</p>
                            <p className="description">{todo.content}</p>
                          </div>
                          <div className="col-2 text-center category">
                            {" "}
                            <i
                              className={this.getCategoryIcon(todo.category)}
                            ></i>{" "}
                            {todo.category}
                          </div>
                          <div className="col-1 text-center timeline">
                            {todo.date} <br /> {todo.time}
                          </div>
                          <div className="col-1 text-center btn d-flex justify-content-around">
                            <button
                              type="button"
                              className="btn "
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              onClick={() => {
                                this.currentEditTodo(todo);
                              }}
                            >
                              <i className="fa-solid fa-pencil update"></i>
                            </button>
                            <button
                              onClick={() => {
                                this.deleteTodo(todo._id);
                              }}
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <i className="fa-solid fa-trash delete"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              {/* Completed  */}
              <div
                className="tab-pane fade"
                id="nav-completed"
                role="tabpanel"
                aria-labelledby="nav-completed-tab"
              >
                <div className="all-todo col-12">
                  <div className="todo-title col-12">
                    <div className="col-2 text-center text-uppercase">
                      Status
                    </div>
                    <div className="col-6 text-uppercase">Content</div>
                    <div className="col-2 text-center text-uppercase">
                      Category
                    </div>
                    <div className="col-1 text-uppercase">Timeline</div>
                    <div className="col-1 text-center text-uppercase"> </div>
                  </div>
                  {this.state.todoList.length === 0 ? (
                    <div className="text-center text-danger my-5 fs-5">
                      There is no data for this tab.
                    </div>
                  ) : (
                    this.state.todoList.map((todo, index) => {
                      return (
                        <div
                          key={todo._id}
                          className={
                            index % 2 === 0 ? "todo-item odd" : "todo-item"
                          }
                        >
                          <div className="col-2 d-flex justify-content-center text-center">
                            <div
                              className={
                                todo.status.toLowerCase().replace(" ", "-") +
                                " col-8"
                              }
                            >
                              {todo.status}
                            </div>
                          </div>
                          <div className="col-6 content">
                            <p className="title">{todo.title}</p>
                            <p className="description">{todo.content}</p>
                          </div>
                          <div className="col-2 text-center category">
                            {" "}
                            <i
                              className={this.getCategoryIcon(todo.category)}
                            ></i>{" "}
                            {todo.category}
                          </div>
                          <div className="col-1 text-center timeline">
                            {todo.date} <br /> {todo.time}
                          </div>
                          <div className="col-1 text-center btn d-flex justify-content-around">
                            <button
                              type="button"
                              className="btn "
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              onClick={() => {
                                this.currentEditTodo(todo);
                              }}
                            >
                              <i className="fa-solid fa-pencil update"></i>
                            </button>
                            <button
                              onClick={() => {
                                this.deleteTodo(todo._id);
                              }}
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <i className="fa-solid fa-trash delete"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              {/* Today  */}
              <div
                className="tab-pane fade"
                id="nav-today"
                role="tabpanel"
                aria-labelledby="nav-today-tab"
              >
                <div className="all-todo col-12">
                  <div className="todo-title col-12">
                    <div className="col-2 text-center text-uppercase">
                      Status
                    </div>
                    <div className="col-6 text-uppercase">Content</div>
                    <div className="col-2 text-center text-uppercase">
                      Category
                    </div>
                    <div className="col-1 text-uppercase">Timeline</div>
                    <div className="col-1 text-center text-uppercase"> </div>
                  </div>

                  {this.state.todoList.length === 0 ? (
                    <div className="text-center text-danger my-5 fs-5">
                      There is no data for this tab.
                    </div>
                  ) : (
                    this.state.todoList.map((todo, index) => {
                      return (
                        <div
                          key={todo._id}
                          className={
                            index % 2 === 0 ? "todo-item odd" : "todo-item"
                          }
                        >
                          <div className="col-2 d-flex justify-content-center text-center">
                            <div
                              className={
                                todo.status.toLowerCase().replace(" ", "-") +
                                " col-8"
                              }
                            >
                              {todo.status}
                            </div>
                          </div>
                          <div className="col-6 content">
                            <p className="title">{todo.title}</p>
                            <p className="description">{todo.content}</p>
                          </div>
                          <div className="col-2 text-center category">
                            {" "}
                            <i
                              className={this.getCategoryIcon(todo.category)}
                            ></i>{" "}
                            {todo.category}
                          </div>
                          <div className="col-1 text-center timeline">
                            {todo.date} <br /> {todo.time}
                          </div>
                          <div className="col-1 text-center btn d-flex justify-content-around">
                            <button
                              type="button"
                              className="btn "
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              onClick={() => {
                                this.currentEditTodo(todo);
                              }}
                            >
                              <i className="fa-solid fa-pencil update"></i>
                            </button>
                            <button
                              onClick={() => {
                                this.deleteTodo(todo._id);
                              }}
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <i className="fa-solid fa-trash delete"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit To Do
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
                      value={this.state.title}
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
                      value={this.state.content}
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
                        value={this.state.date}
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
                        value={this.state.time}
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
                      value={this.state.category}
                    >
                      <option value={"Spor"} defaultValue={"Spor"}>
                        Spor
                      </option>
                      <option value={"Shop"}>Shop</option>
                      <option value={"Work"}>Work</option>
                      <option value={"Family"}>Family</option>
                      <option value={"Other"}>Other</option>
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
                      value={this.state.status}
                    >
                      <option value={"To Do"} defaultValue={"To Do"}>
                        To Do
                      </option>
                      <option value={"In Progress"}>In Progress</option>
                      <option value={"Done"}>Done</option>
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
                    this.updateTodo();
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
      </div>
    );
  }
}
