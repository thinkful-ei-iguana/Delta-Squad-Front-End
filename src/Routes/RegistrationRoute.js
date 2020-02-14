import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Helpers/Auth";

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  state = { error: null };

  createSubmit = ev => {
    ev.preventDefault();
    const { first_name, user_name, user_email, password } = ev.target;

    this.setState({ error: null });

    Auth.createAccount({
      first_name: first_name.value,
      user_name: user_name.value,
      user_email: user_email.value,
      password: password.value
    })
      .then(user => {
        first_name.value = "";
        user_name.value = "";
        user_email.value = "";
        password.value = "";
        this.handleRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className="Creation">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" onSubmit={this.createSubmit}>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="first_name"
              placeholder="Name"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Display name</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="user_name"
              placeholder="Username"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Username</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="email"
              name="user_email"
              placeholder="Email"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Email</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="password"
              type="password"
              placeholder="Password"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <button className="submitCreate">Create</button>
            <Link to="/Login">
              <button className="newAccount">Already have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
