import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PlannerHelper from "../../Helpers/Planner";
// import MealPlans from "./MealPlans";
import config from "../../config";
import TokenService from "../../Helpers/Token";

class EditMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealplan: [],
      updateMealPlan: false
    };
  }

  componentDidMount() {
    this.setMealPlan();
  }

  setMealPlan = () => {
    const originalMealPlan = this.props.location.state;
    console.log("original mealplan", this.props.location.state);

    this.setState({
      mealplan: originalMealPlan
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let mealPlanId = this.props.match.params.mealPlanId;
    const url = `${config.API_ENDPOINT}/planner/${mealPlanId}`;
    const authToken = TokenService.getAuthToken();
    let { title, planned_date, prep_time, needed_ingredients } = e.target;

    let updateMealPlan = {
      id: mealPlanId,
      title: title.value || this.props.location.state.title,
      planned_date:
        planned_date.value || this.props.location.state.planned_date,
      prep_time: prep_time.value || this.props.location.state.prep_time,
      needed_ingredients:
        needed_ingredients.value || this.props.location.state.needed_ingredients
    };
    console.log("updated mealplan to be sent to server is:", updateMealPlan);
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updateMealPlan)
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(data => {
        console.log("patch data is", data);
        this.props.history.push("/planner");
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleGoBack = () => {
    return this.props.history.push("/planner");
  };

  setStateUpdateMealPlanTrue = () => {
    this.setState({
      updateMealPlan: true
    });
  };

  handleUpdateMealPlan = () => {
    return (
      <div>
        {this.state.updateMealPlan === true && (
          <div>
            <form id="modal-content" onSubmit={this.handleSubmit}>
              <label>Mealplan:</label>
              <input id="mealplan" name="title" type="text"></input>
              <div id="mealplan-date">
                <input id="planned-date" name="planned_date">
                  Mealplan Date:
                </input>
              </div>
              <label id="meaplan-prep-time">Time to make:</label>
              <input
                id="mealplan-prep-time"
                name="prep_time"
                type="text"
              ></input>
              <label id="meaplan-needed-ingredients">Ingredients needed:</label>
              <input
                id="mealplan-needed-ingredients"
                name="needed_ingredients"
                type="text"
              ></input>
              <button id="close">Plan it!</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  handleDeleteMealplan = e => {
    e.preventDefault();
    let mealPlanId = this.props.match.params.mealPlanId;
    const url = `${config.API_ENDPOINT}/planner/${mealPlanId}`;
    const authToken = TokenService.getAuthToken();

    console.log("mealplan to be sent to server is", mealPlanId);
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(data => {
        console.log("delete is", data);
        this.props.history.push("/planner");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    return (
      <div id="individual-mealplan-view">
        <section id="original-mealplan-data">
          <h2 id="update-header"></h2>
          <p>
            Mealplan: {this.props.location.state.title}
            <br />
            Planned date: {this.props.location.state.planned_date}
            <br />
            Time to prepare: {this.props.location.state.prep_time}
            <br />
            Ingredients needed: {this.props.location.state.needed_ingredients}
          </p>
        </section>
        <button
          id="update-mealplan-button"
          type="submit"
          onClick={() => this.setStateUpdateMealPlanTrue()}
        >
          Update
        </button>
        <button
          id="update-mealplan-button"
          type="submit"
          onClick={e => this.handleDeleteMealPlan(e)}
        >
          Delete
        </button>
        {this.handleUpdateMealPlan()}
        <button
          id="go-back-button"
          type="submit"
          onClick={() => this.handleGoBack()}
        >
          Go back
        </button>
      </div>
    );
  }
}

export default EditMealPlan;
