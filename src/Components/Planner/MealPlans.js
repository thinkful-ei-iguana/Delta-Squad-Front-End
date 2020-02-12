import React, { Component } from "react";
import TokenService from "../../Helpers/Token";

class MealPlans extends Component {
  render() {
    console.log("this.props", this.props);
    return (
      <section>
        {/* <p>Title: {this.props.location.state.title}</p>
        <p>Meal date: {this.props.location.state.planned_date}</p>
        <p>Prep time: {this.props.location.state.prep_time}</p>
        <p>
          Ingredients required: {this.props.location.state.recipe_ingredients}
        </p> */}
      </section>
    );
  }
}

export default MealPlans;
