import React, { Component } from "react";
import LoginForm from "../Components/Login/LoginForm";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  onLoginSuccess = () => {
    const { location, history } = this.props;
    console.log("this.props is", this.props);
    const destination = (location.state || {}).from || "/home";
    history.push(destination);
  };

  render() {
    return (
      <section>
        <LoginForm onLoginSuccess={this.onLoginSuccess} />
      </section>
    );
  }
}

export default LoginRoute;
