import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../Helpers/Token";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealplan: [],
      updateMealPlan: false,
      selectedDate: new Date(),
      error: null
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
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedMealPlan)
    })
      .then(res => {
        if (!res.ok) { this.setState({ error: !res.ok }) }
        else {
          this.props.history.push("/planner");

        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.error });
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

  setStateDate = e => {
    this.setState({
      selectedDate: e
    });
  }


  handleUpdateMealPlan = () => {
    let error = this.state.error;
    return (
      <div>
        {this.state.updateMealPlan === true && (
          <div>
            <form id="modal-content-update" className="editMealplanModal" onSubmit={(e) => this.handleSubmit(e)}>
              {error && <p className="empty-fields-error-message-green-bg">Fields must either be left empty, or contain characters (cannot contain only spaces). Please try again.</p>}
              <label>Title:</label>
              <input id="mealplan" name="title" type="text"></input>
              <label id="planned-date" name="planned_date">
                Meal plan date:
              </label>
              <DatePicker name="planned_date" selected={this.state.selectedDate} onChange={(e) => this.setStateDate(e)} />
              {/* <input id="planned-date" type="date" required name="planned_date"></input> */}
              <label id="meaplan-prep-time">Time to make:</label>
              <input
                id="mealplan-prep-time"
                type="number"
                min="1"
                name="time_to_make"
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
        this.props.history.push("/planner");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="individual-mealplan-view">
        <section id="original-mealplan-data">
          <h2 id="update-header">Edit MealPlan</h2>
          <p id="edit-plan-text">Click below to update your meal plan. Edit any or all fields; untouched fields in the edit window will retain their original values.</p>
          <h3 className="mealplanInfo">
            <p className="boldLabel">Title:</p> {_.get(this, "props.location.state.title")}
            <br />
            <p className="boldLabel">Planned date:</p> {_.get(this, "props.location.state.planned_date")}
            <br />
            <p className="boldLabel">Time to make:</p> {_.get(this, "props.location.state.time_to_make")} minutes
            <br />
            <p className="boldLabel">Ingredients required:</p>
            {_.get(this, "props.location.state.needed_ingredients")}
          </h3>
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
}

export default MealPlan;
