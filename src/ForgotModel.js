import React, { Component } from "react";
export default class ForgotModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sendMail: false,
      notFoundEmail: false,
    };
  }
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  forgotPassword = async () => {
    let forgottenData = {
      email: this.state.email,
    };
    let response = await fetch(
      "http://localhost:5000/api/auth/forgotpassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(forgottenData),
      }
    );
    let data = await response.json();
    if (data.success) {
      this.setState({ sendMail: true, notFoundEmail: false });
    } else {
      this.setState({ notFoundEmail: true });
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
            <div className="col-lg-7 px-5 pt-5">
              <h1 className="my-font font-weight-bold py-3 mb-3">
                Forgot your password?{" "}
              </h1>
              <h5 className="my-font font-weight opacity-75">
                Enter your email below to receive your password reset
                instructions
              </h5>
              {this.state.sendMail ? (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  Password reset link has been sent to your e-mail. Please check
                  your e-mail address.
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              ) : (
                <span></span>
              )}
              {this.state.notFoundEmail ? (
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
                    There is no registered user with the entered email account.
                  </div>
                </div>
              ) : (
                <span></span>
              )}
              <form>
                <div className="form-row mt">
                  <div className="col-lg-7">
                    <label htmlFor="email" className="my-font">
                      Email
                    </label>
                    <input
                      onChange={(e) => {
                        this.onChangeHandler(e);
                      }}
                      name="email"
                      type="email"
                      className="register-input shadow bg-white rounded my-font form-control my-1 p-2"
                      placeholder="Email-address"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="my-font col-lg-7">
                    <button
                      onClick={() => {
                        this.forgotPassword();
                      }}
                      type="button"
                      className="register-btn mt-3 mb-5"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <p className="my-font opacity-75">
                  Back to
                  <a
                    href="http://localhost:3000/"
                    className="my-font link-dark fst-italic fs-5"
                  >
                    Login
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
