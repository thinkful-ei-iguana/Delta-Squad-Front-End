import React, { Component } from "react";
import config from "../../config";
// import MakeMealPlans from "./MakeMealPlans";
// import EditMealPlan from "./EditMealPlan";
import TokenService from "../../Helpers/Token";

class MealPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealplan: []
    };
  }

  componentDidMount() {
    // console.log(TokenService.getAuthToken(), "tokenservice");
    fetch(`${config.API_ENDPOINT}/planner`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(mealPlanRes => this.setState({ mealplan: mealPlanRes }));
  }

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    console.log("this.state", this.state.value);
    return (
      <div className="RecentResults">
        <section className="flex-container">
          {/* {this.state.mealplans &&
            this.state.mealplans.map(mealplan => {
              <mealplan key={mealplan.id} />;
            })} */}
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
  // )

  // <div key={mealplan.id} className="food-item">
  //   <mealplan {...mealplan} />;
  // </div>
}

export default MealPlans;
