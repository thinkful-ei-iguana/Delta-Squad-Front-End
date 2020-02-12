import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Helpers/Auth";
import Context from "../Component/Context";

export default class Login extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.name.value
    });
  };

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }
    this.setState({
      first_name: this.context.currentUser.first_name,
      user_email: this.context.currentUser.user_email,
      user_name: this.context.currentUser.user_name
    });
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    this.context.onLogout();
    history.push("/login");
  };

  state = { error: null };

  createSubmit = ev => {
    ev.preventDefault();
    const { first_name, user_email, user_name, password } = ev.target;
    const currentUsername = this.context.currentUser.user_name;

    this.setState({ error: null });
    Auth.updateAccount(
      {
        id: this.context.currentUser.id,
        first_name: first_name.value,
        user_email: user_email.value,

        username() {
          if (currentUsername === user_name.value) {
            return "";
          } else {
            return `username: ${user_name.value}`;
          }
        },
        password() {
          if (password.value.length > 0) {
            return `password: ${password.value}`;
          } else {
            return "";
          }
        }
      },
      this.context.currentUser.id
    )
      .then(this.handleRegistrationSuccess())
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form
          className="Creation-Form"
          onSubmit={this.createSubmit}
          onChange={this.handleChange}
        >
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              value={this.state.first_name}
              name="name"
              placeholder="Name"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Name</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              value={this.state.user_email}
              type="email"
              name="email"
              placeholder="Email"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Email</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              value={this.state.user_name}
              name="username"
              placeholder="Username"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Username</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              name="password"
              type="password"
              placeholder="Password"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <button className="submitinformation">Submit Changes</button>
            <Link to="/login">
              <button className="newAccount">Have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
