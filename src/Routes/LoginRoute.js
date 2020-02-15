import React, { Component } from "react";
import LoginForm from "../Components/Login/LoginForm";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  render() {
    return (
      <section>
        <LoginForm />
      </section>
    );
  }
}

export default LoginRoute;
