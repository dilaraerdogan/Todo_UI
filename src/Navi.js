import React, { Component } from "react";
import "./Style.css";
export default class Navi extends Component {
  logout = async () => {
    let authToken = localStorage.getItem("token");
    let response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer: ${authToken}`,
      },
    });
    let result = await response.json();
    if (result.success) {
      localStorage.clear();
      window.location.replace("http://localhost:3000/");
    } else {
      console.log("error");
      //window.location.replace("http://localhost:3000/");
    }
  };
  render() {
    return (
      <header className="col-12">
        <div className="col-md-11 col-12 header-div">
          <div className="d-flex justify-content-between mb-4">
            <h1 className="title">{this.props.info.title}</h1>
            <button
              onClick={() => {
                this.logout();
              }}
              className="btn btn-outline-danger rounded-3"
            >
              Log out
            </button>
          </div>
          <div className="create-search">
            <button
              type="button"
              className="btn "
              data-bs-toggle="modal"
              data-bs-target="#inputModal"
            >
              <i className="fa-solid fa-circle-plus"></i> New To-Do
            </button>
            <div>
              <input type="text" placeholder="Search ..." />
              <a href="www.google.com" className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
