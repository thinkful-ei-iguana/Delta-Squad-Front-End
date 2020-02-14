import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Context from "../Contexts/Context";
import RecentResults from "./Recent-Results";

export default class Landing extends React.Component {
  // static contextType = Context;
  // constructor() {
  //   super();
  //   this.state = { counter: 0 };
  // }
  render() {
  //   if (this.context.recipes.length === 0) {
  //     return <p>Loading</p>;
  //   }
  //   document.addEventListener("click", function (event) {
  //     event.preventDefault(event);
  //   });

    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="k-h-logo">
            <img src="../images/Landing-BannerD1.gif" alt="Kitchen Helper Logo" />
          </div>
          <div className="flex-item"></div>
          <div className="login-signup">
            <Link className="Login-Signup" to="/">
              Continue to Kitchen Helper!
            </Link>
          </div>
        </header>
        <section id="landingDocumentation">
          <div className="site-description">
            <p>
              Kitchen Helper is best friend in the kitchen.  
              This app combines the ability to track the items in your pantry, the 
              opportunity to plan your meals for a given time period and puts a large
              database of recipes at your fingertips.  You also have the ability to add
              your own recipes and create shopping lists once your meals are planned.           
            </p>
            <p>Kitchen Helper will be a time and money saver, helping you create
              amazing meals at home while staying organized and never running out 
              of that special ingredient you need for your amazing lasagna recipe.
            </p>
            <img src="" alt="Recipe Search" id="recipe-search"/>
            <img src="" alt="Pantry Ingredient List" id="pantry-list"/>
            <img src="" alt="Meal Planning" id="meal-planning-form" />

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
