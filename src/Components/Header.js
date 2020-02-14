// import React from "react";
// import { Link } from "react-router-dom";
// // import MobileMenu from "../Components/Mobile-Menu";
// import DesktopMenu from "../Components/Desktop-Menu";
// import Context from "../Contexts/Context";

// function isMobile() {
//   if (window.innerWidth < 1200) {
//     return true;
//   }
//   return false;
// }

// export default class NavMenu extends React.Component {
//   static contextType = Context;

//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false
//     };
//   }

//   toggleMenu = () => {
//     this.setState(prevState => ({ open: !prevState.open }));
//   };

//   render() {
//     return (
//       <header className="Nav-Header">
//         <Link to="/Landing"></Link>
//         <DesktopMenu
//           state={this.state}
//           routeProps={this.props}
//           LightMode={this.toggleLightMode}
//           renderLoginLink={this.renderLoginLink}
//           renderLogoutLink={this.renderLogoutLink}
//         />
//       </header>
//     );
//   }
// }

import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../Helpers/Token";
import UserContext from "../Contexts/UserContext";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    // console.log("nav menu context is", this.context);
    // console.log("nav menu props is", this.props);
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
        <Link className="login-page-login" to="/login">
          Login
        </Link>{" "}
        <Link className="login-page-register" to="/register">
          Sign up
        </Link>
      </nav>
    );
  }

  renderNavMenu() {
    return (
      <section id="navBar">
        <Link className="nav-link-text pantry" to={`/pantry`}>
          Pantry
        </Link>
        {/* <Link
            className="nav-link-text marketplace"
            to={`/marketplace`}>Marketplace</Link> */}
        <br />
        <Link className="nav-link-text recipes" to={"/recipes"}>
          Recipes
        </Link>
        <br />
        <Link className="nav-link-text meal-planning" to={`/planner`}>
          Meal Plans
        </Link>
      </section>
    );
  }

  render() {
    return (
      <header className="heading">
        <h1 className="login-page-header">
          <Link className="login-page-link" to="/login">
            Kitchen Helper
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
