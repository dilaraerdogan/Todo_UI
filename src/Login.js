import React, { Component } from "react";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginControl: false,
    };
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  accessControl = () => {
    this.setState({ loginControl: true });
  };
  login = async () => {
    let loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    //Response Objesi oluşturma işlemi
    //Response Object
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loginData),
    });
    //response'un üzerinden json'la tekrar bir promise döndürme işlemi
    //Json Object
    let data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.access_token);
      window.location.replace("http://localhost:3000/todo");
    } else {
      this.accessControl();
    }
  };
  render() {
    return (
      <section className="register my-4 mx-5">
        <div className="container">
          <div className="design row g-0">
            <div className="col-lg-5">
              <img src="/foto.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-7 px-5 pt-5 ">
              <h1 className="my-font font-weight-bold py-3 mb-3">Login up</h1>
              <h5 className="my-font opacity-75 mb-3">
                Sign into your account
              </h5>
              {this.state.loginControl ? (
                <div class="alert alert-danger" role="alert">
                  Login Failed: Your user name or password is incorrect
                </div>
              ) : (
                <div></div>
              )}
              <form>
                <div className="form-row containerim">
                  <div className="col-lg-7 " id="div-container">
                    <input
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      name="email"
                      type="email"
                      className="register-input shadow  rounded my-font form-control opacity-50 my-3 p-2"
                      placeholder="Email-address"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7" id="div-container">
                    <input
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      name="password"
                      type="password"
                      className=" register-input shadow bg-white opacity-50 rounded my-font form-control my-3 p-2"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="offset-1 col-lg-5">
                    <button
                      onClick={() => {
                        this.login();
                      }}
                      type="button"
                      className=" my-font register-btn mt-3 mb-5"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <a
                  href="http://localhost:3000/forgotPassword"
                  className="my-font  link-secondary fst-italic fs-5"
                >
                  Forgot Password{" "}
                </a>
                <p className="my-font opacity-75">
                  Don't have an account?
                  <a
                    href="http://localhost:3000/register"
                    className="my-font  link-dark fst-italic fs-5"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
