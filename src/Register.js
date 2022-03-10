import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      createAccount: false,
    };
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  register = async () => {
    let registerData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    let response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(registerData),
    });
    let data = await response.json();
    if (data.success) {
      console.log(data.access_token);
      localStorage.setItem("token", data.access_token);
      window.location.replace("http://localhost:3000/");
    } else {
      this.setState({ createAccount: true });
    }
  };
  render() {
    return (
      <section className="register my-4 mx-5">
        <div className="container">
          <div className="row design g-0">
            <div className="col-lg-5">
              <img src="/foto.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-7 px-5 pt-5">
              <h1 className="my-font font-weight-bold py-3">Sign up</h1>
              {this.state.createAccount ? (
                <div
                  class="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>
                    Something went wrong. The user could not be registered.
                  </div>
                </div>
              ) : (
                <span></span>
              )}
              <form>
                <div className="form-row">
                  <div className="col-lg-7">
                    <label htmlFor="user_name" className="my-font">
                      User Name
                    </label>
                    <input
                      name="name"
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      type="text"
                      className="register-input shadow bg-white rounded my-font form-control my-1 p-2"
                      placeholder="User Name"
                    />
                  </div>
                </div>
                <div className="form-row mt">
                  <div className="col-lg-7">
                    <label htmlFor="email" className="my-font">
                      Email
                    </label>
                    <input
                      name="email"
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      type="email"
                      className="register-input shadow bg-white rounded my-font form-control my-1 p-2"
                      placeholder="Email-address"
                    />
                  </div>
                </div>
                <div className="form-row mt">
                  <div className="col-lg-7">
                    <label htmlFor="password" className="my-font">
                      Password
                    </label>
                    <input
                      name="password"
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      type="password"
                      className="register-input shadow bg-white rounded my-font form-control my-1 p-2"
                      placeholder="***********"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="my-font col-lg-7">
                    <button
                      onClick={() => {
                        this.register();
                      }}
                      type="button"
                      className="register-btn mt-3 mb-5"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
