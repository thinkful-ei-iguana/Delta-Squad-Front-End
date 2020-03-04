import React from "react";
import { Link } from "react-router-dom";
import homePage from "../../Assets/homePage.gif";
import pantryLanding from '../../Assets/pantryLanding.gif';
import recipeDetail from '../../Assets/recipeDetail.gif';
import "./LandingPage.css";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item branding">
          </div>
          <div className="flex-item"></div>
        </header>
        <section id="landingDocumentation">
          <div className="site-description">
            <p className="p1">
              Kitchen Helper is a best friend in the kitchen. This app combines
              the ability to track the items in your pantry, the opportunity to
              plan your meals for a given time period and puts a large database
              of recipes at your fingertips. You also have the ability to add
              your own recipes and create shopping lists once your meals are
              planned.
            </p>
            <p className="p2">
              Kitchen Helper will be a time and money saver, helping you create
              amazing meals at home while staying organized and never running
              out of that special ingredient you need for your amazing lasagna
              recipe.
            </p>

            <div className="login-signup">
              <div className="LoginBtn">
                <label className="login-label">Login: </label>
                <Link className="login-btn" to="/login">
                  Let's Get Cooking!
                </Link>
              </div>
              <div className="RegistrationBtn">
                <label className="registration-label">Sign Up:</label>
                <Link className="registration-btn" to="/register">
                  Come Join the Fun!
                </Link>
              </div>
            </div>
            <h4>Please test out our site using the username of 'Guestuser' and the password of !1asdf@@@M</h4>
            <div className="sampleImages">
              <img src={pantryLanding} className="landingSamples" alt="Pantry Landing" id="recipe-search" />
              <img src={homePage} className="landingSamples" alt="Home Page" id="pantry-add-form" />
              <img src={recipeDetail} className="landingSamples" alt="Recipe Detail" id="meal-planning-add-button" />
            </div>
          </div>
        </section>
        <section id="Landing-Buttons">
          <hr id="Connect-Divider" />
          <div id="buttons"></div>
        </section>
      </div>
    );
  }
}
