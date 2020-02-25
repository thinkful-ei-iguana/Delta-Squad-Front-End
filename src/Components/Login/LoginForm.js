import React from "react";
import { Link } from "react-router-dom";
import AuthHelper from "../../Helpers/Auth";
import UserContext from "../../Contexts/UserContext";
import "./Login.css";
// import Context from "../../Contexts/Context";

class LoginForm extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    },
    onLoginSuccess: () => { }
  };

  state = { error: null };

  static contextType = UserContext;

  // firstInput = React.createRef();


  loginSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;
    AuthHelper.login({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <div role="alert" className="login-fail-error">
          {error && <p className="red">{'Something went wrong. Please try again.'}</p>}
        </div>
        <header className="Login-Header"></header>
        <form
          className="login-form"
          onSubmit={this.loginSubmit}
        >
          <label
            htmlFor="user_name"
            className="username-fields-label">
            Username
            </label>
          <input
            id="user_name"
            className="username-fields"
            required
            name="user_name"
            placeholder="Username"
            onChange={this.userNameChanged}
          />
          <br />
          <label
            htmlFor="password"
            className="password-fields">
            Password
          </label>
          <input
            id="password"
            className="password-fields"
            required
            name="password"
            type="password"
            placeholder="Password"
          />

          <div className="btn-row">
            <input
              type="submit"
              className="submit-login"
              value="Submit"
            />
            <br />
            <Link to="/register">
              <button className="new-account">Create an account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
