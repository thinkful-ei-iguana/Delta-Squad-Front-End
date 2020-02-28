import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import TokenService from "../Helpers/Token";
import AddMealPlan from "../Components/Planner/MakeMealPlans";
import "../Styles/Planner.css";

class PlannerRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealplans: [],
      addMealPlan: false
    };
  }

  componentDidMount() {
    this.getMealPlans();
  }

  getMealPlans = () => {
    const url = `${config.API_ENDPOINT}/planner`;
    const authToken = TokenService.getAuthToken();
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return this.setState({
          mealplans: data
        });
      });
  };


  renderMealPlans = () => {
    const mealplans = this.state.mealplans;
    return mealplans.map(mealplan => (
      <section className="mealplan-section" key={mealplan.id}>
        <h2 className="mealplan-title">{mealplan.title}</h2>
        <span className="planned-date">Planned for: {mealplan.planned_date}</span>{" "}
        <br />
        <br />
        <Link
          to={{
            pathname: `/planner/${mealplan.id}`,
            state: {
              id: mealplan.id,
              title: mealplan.title,
              planned_date: mealplan.planned_date,
              time_to_make: mealplan.time_to_make,
              needed_ingredients: mealplan.needed_ingredients
            }
          }}
        >
          <button className="smallButton">
            View/Edit Meal Plan</button>
        </Link>
        <br />
      </section>
    ));
  };

  setStateAddMealPlanTrue = () => {
    this.setState({ addMealPlan: true });
  };

  setStateAddMealPlanFalse = () => {
    this.setState({ addMealPlan: false });
  };

  render() {
    return (
      <section id="planner-route-container">
        <h2 className="my-planner-header" id="my-planner-header">
          My Meal Plans
        </h2>
        <p id="planner-text">
          Create, update, and manage your meal plans
        </p>
        <button
          className="bigButton"
          type="submit"
          onClick={() => this.setStateAddMealPlanTrue()}
        >
          Add a Meal Plan
        </button>
        <AddMealPlan
          addMealPlan={this.state.addMealPlan}
          allMealPlans={this.state.mealplans}
          refreshMealPlans={this.getMealPlans}
          closeAddForm={this.setStateAddMealPlanFalse}
        />
        {this.state.mealplans && this.renderMealPlans()}
      </section>
    );
  }
}

export default PlannerRoute;
