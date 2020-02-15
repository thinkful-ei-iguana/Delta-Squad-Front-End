import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import LandingLogo from "../../Assets/LandingLogo.gif";
import './LandingPage.css';
// import Context from "../Contexts/Context";
// import RecentResults from "../Components/Recent-Results";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn : false}
  }
  
  render() { 
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item branding">
            <img 
              classname="Landing-Logo" 
              src={LandingLogo} 
              alt="Kitchen Helper Logo" 
              width="60%"
              height="250px"/>
          </div>
          <div className="flex-item"></div>
          
        </header>
        <section id="landingDocumentation">
          <div className="site-description">
            <p>
              Kitchen Helper is a best friend in the kitchen.  
              This app combines the ability to track the items in your pantry, the 
              opportunity to plan your meals for a given time period and puts a large
              database of recipes at your fingertips.  You also have the ability to add
              your own recipes and create shopping lists once your meals are planned.           
            </p>
            <p>Kitchen Helper will be a time and money saver, helping you create
              amazing meals at home while staying organized and never running out 
              of that special ingredient you need for your amazing lasagna recipe.
            </p>

            <div className="login-signup">
              <div className="LoginBtn">
              <Link className="login-btn" to='/login'>
                Let's Get Cooking!
              </Link>
              </div>
              <div className="RegistrationBtn">
                <Link className="registration-btn" to='/register'>
                  Come Join the Fun!
                </Link>
                </div>  
            </div>
            <div className="sampleImages">
              <img src="" alt="Recipe Search" id="recipe-search"/>
              <img src="" alt="Pantry Ingredient List" id="pantry-list"/>
              <img src="" alt="Meal Planning" id="meal-planning-form" />
            </div>
          </div>
         
        </section>
        <section id="Landing-Buttons">
          <hr id="Connect-Divider" />
          <div id="buttons">
            
          </div>
        </section>
      </div>
    );
  }
}
