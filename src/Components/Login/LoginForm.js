import React from "react";
import { Link } from "react-router-dom";
import AuthHelper from "../../Helpers/Auth";
// import Context from "../../Contexts/Context";
import UserContext from "../../Contexts/UserContext";

class LoginForm extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    },
    onLoginSuccess: () => {}
  };
  state = { error: null };

  static contextType = UserContext;

  // firstInput = React.createRef();

  onLoginSuccess = () => {
    const { location, history } = this.props;
    console.log("this.props.location is", this.props.location);
    const destination = (location.state || {}).from || "/home";
    history.push(destination);
    // this.context.setUser = this.props.location
  };

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

  // componentDidMount() {
  //   console.log('first input is', this.firstInput);
  //   this.firstInput.current.focus();
  // }

  render() {
    return (
      <div className="Login">
        <header className="Login-Header"></header>
        <form
          className="Login-Form"
          onSubmit={this.loginSubmit}
          onMouseOver={this.submitButtonHasBeenHovered}
        >
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="user_name"
              placeholder="Username"
              onChange={this.userNameChanged}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Username</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.passwordHasChanged}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <input
              type="submit"
              className="submitLogin"
              value="login"
              onClick={this.submitButtonHasBeenClicked}
            />
            <Link to="/register">
              <button className="newAccount">Create an account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
