import Main from "./Main";
import Modal from "./Modal";
import Navi from "./Navi";
import ForgotModel from "./ForgotModel";
import "./Style.css";
import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    let naviData = { title: "To-Do List" };
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/todo"
            element={
              <>
                <Navi info={naviData}></Navi>
                <Main {...this.props} />
                <Modal />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotModel />}></Route>
          <Route element={<Login />} />
        </Routes>
      </div>
    );
  }
}
