import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../Helpers/Token";
import UserContext from "../../Contexts/UserContext";
import LandingLogo from "../../Assets/LandingLogo.gif";
import "./HeaderNav.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <nav className="log-out-user">
          <div className="logged-in-user">{this.context.user.name}</div>
          <Link
            className="log-out-user-link"
            onClick={this.handleLogoutClick}
            to="/login"
          >
            Logout
          </Link>
          {this.renderNavMenu()}
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="login-page-heading">
        <Link className="login-page-login login-page-link" to="/login">
          Login
        </Link>{" "}
        <Link className="login-page-register login-page-link" to="/register">
          Sign up
        </Link>
      </nav>
    );
  }

  renderNavMenu() {
    return (
      <section id="navBar">
        <Link className="dashboard-link-selector" to={"/home"}>
          Home
        </Link>
        <br />
        <Link className="nav-link-text pantry" to={"/pantry"}>
          Pantry
        </Link>
        <br />
        <Link className="nav-link-text recipes" to={"/recipes"}>
          Recipes
        </Link>
        <br />
        <Link className="nav-link-text meal-planning" to={"/planner"}>
          Meal Plans
        </Link>
      </section>
    );
  }

  render() {
    return (
      <header className="heading">
        <div className="landing-image">
          <a href="http://localhost:3000/">
            <img src={LandingLogo} alt="Landing Logo" className="landinglogo" />
          </a>
          <Link className="login-page-link" to="/">

          </Link>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
