import React, { Component } from "react";
import config from "../../config";
// import TokenService from "../../Helpers/Token";

class MealPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealplans: []
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/planner`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(mealPlanRes => this.setState({ mealplans: mealPlanRes }));
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className="RecentResults">
        <section className="flex-container">
          {this.state.mealplans.map(mealplan => (
            <mealplan key={mealplan.id} {...mealplan} />
          ))}
        </section>
      </div>
    );
  }

  // return (
  //   <section>
  //     <p>Title: {this.props.location.state.title}</p>
  //     <p>Meal date: {this.props.location.state.planned_date}</p>
  //     <p>Prep time: {this.props.location.state.prep_time}</p>
  //     <p>
  //       Ingredients required: {this.props.location.state.recipe_ingredients}
  //     </p>
  //   </section>
  // );
}

export default MealPlans;
