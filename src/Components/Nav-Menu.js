import React from "react";
import { Link } from "react-router-dom";
// import MobileMenu from "../Components/Mobile-Menu";
import DesktopMenu from "../Components/Desktop-Menu";
import Context from "../Contexts/Context";

// function isMobile() {
//   if (window.innerWidth < 1200) {
//     return true;
//   }
//   return false;
// }

export default class NavMenu extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    return (
      <header className="Nav-Header">
        <Link to="/Landing"></Link>
        <DesktopMenu
          state={this.state}
          routeProps={this.props}
          LightMode={this.toggleLightMode}
          renderLoginLink={this.renderLoginLink}
          renderLogoutLink={this.renderLogoutLink}
        />
      </header>
    );
  }
}
