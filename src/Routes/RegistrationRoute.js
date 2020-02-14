import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Helpers/Auth";
import "./Registration.css"

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
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
      <div className="register">
        <header className="Creation-Header"></header>
        <form className="register-form" onSubmit={this.createSubmit}>
          <label className="field a-field a-field_a2">
            Display name
          </label>
          <input
            className="field__input a-field__input"
            required
            name="first_name"
            placeholder="Name"
          />
          <br />
          <label className="field a-field a-field_a2">
            Username
          </label>
          <input
            className="field__input a-field__input"
            required
            name="user_name"
            placeholder="Username"
          />
          <br />
          <label className="field a-field a-field_a2">
            Email
          </label>
          <input
            className="register-email-input"
            required
            type="email"
            name="user_email"
            placeholder="Email"
          />
          <br />

          <label className="field a-field a-field_a2">
            Password
          </label>
          <input
            className="field__input a-field__input"
            required
            name="password"
            type="password"
            placeholder="Password"
          />
          <div className="btn-row">
            <button className="register-submit">Create</button>
            <br />

            <Link to="/Login">
              <button className="new-account">Already have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}