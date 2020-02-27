import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../Helpers/Token";
import _ from "lodash";

class MealPlan extends Component {
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
    const originalMealPlan = _.get(this, "props.location.state");
    this.setState({
      mealplan: originalMealPlan
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let mealPlanId = this.props.match.params.mealPlanId;
    const url = `${config.API_ENDPOINT}/planner/${mealPlanId}`;
    const authToken = TokenService.getAuthToken();
    let { title, planned_date, time_to_make, needed_ingredients } = e.target;

    let updatedMealPlan = {
      id: mealPlanId,
      title: title.value || this.props.location.state.title,
      planned_date:
        planned_date.value || this.props.location.state.planned_date,
      time_to_make:
        time_to_make.value || this.props.location.state.time_to_make,
      needed_ingredients:
        needed_ingredients.value || this.props.location.state.needed_ingredients
    };
    console.log("updated mealplan to be sent to server is:", updatedMealPlan);
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedMealPlan)
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
            <form id="modal-content-update" className="editMealplanModal" onSubmit={this.handleSubmit}>
              <label>Mealplan:</label>
              <input id="mealplan" name="title" type="text"></input>
              <label id="planned-date" name="planned_date">
                Mealplan Date:
              </label>
              <input id="planned-date" name="planned_date"></input>
              <label id="meaplan-prep-time">Time to make:</label>
              <input
                id="mealplan-prep-time"
                name="time_to_make"
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

  handleDeleteMealPlan = e => {
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
    return (
      <div className="individual-mealplan-view">
        <section id="original-mealplan-data">
          <h2 id="update-header">Edit MealPlan</h2>
          <p className="mealplanInfo">
            <p className="boldLabel">Title:</p> {_.get(this, "props.location.state.title")}
            <br />
            <p className="boldLabel">Planned date:</p> {_.get(this, "props.location.state.planned_date")}
            <br />
            <p className="boldLabel">Time to make:</p> {_.get(this, "props.location.state.time_to_make")}
            <br />
            <p className="boldLabel">Ingredients required:</p>
            {_.get(this, "props.location.state.needed_ingredients")}
          </p>
        </section>
        <button
          className="smallButton"
          type="submit"
          onClick={() => this.setStateUpdateMealPlanTrue()}
        >
          Update
        </button>
        <button
          className="smallButton"
          type="submit"
          onClick={e => this.handleDeleteMealPlan(e)}
        >
          Delete
        </button>
        {this.handleUpdateMealPlan()}
        <button
          className="smallButton"
          type="submit"
          onClick={() => this.handleGoBack()}
        >
          Go back
        </button>
      </div>
    );
  }
  // return (
  //   <section>
  //     <p>Title: {this.props.location.state.title}</p>
  //     <p>Meal date: {this.props.location.state.planned_date}</p>
  //     <p>Prep time: {this.props.location.state.time_to_make}</p>
  //     <p>
  //       Ingredients required: {this.props.location.state.recipe_ingredients}
  //     </p>
  //   </section>
  // )

  // <div key={mealplan.id} className="food-item">
  //   <mealplan {...mealplan} />;
  // </div>
}

export default MealPlan;
