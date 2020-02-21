import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../Helpers/Token";
import PlannerHelper from "../../Helpers/Planner";
import Calendar from "rc-calendar";

class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMealPlan: false,
      newMealPlan: [],
      postMealPlan: []
    };
  }

  // planned_date should = whatever is selected for in calendar.
  // calendar should be rendered once the input field is selected

  // componentDidMount() {
  //   this.setCalendar();
  // }
  // setCalendar = () => {
  //   const planned_date = this.props.location.state;
  //   console.log("original planned_date", this.props.location.state);

  //   this.setState({
  //     calendar: planned_date
  //   });
  // };

  // setCalendar = () => {
  //   return (
  //     <div>
  //       <Calendar onSelect={(this.onSelect = this.props.planned_date)} />
  //     </div>
  //   );
  // };

  handleSetCalendar = () => {
    return <Calendar onSelect={console.log(this.props)} />;
  };

  handleSubmit = e => {
    e.preventDefault();
    let { title, planned_date, prep_time, needed_ingredients } = e.target;
    const mealPlanJson = JSON.stringify({
      title: title.value,
      planned_date: planned_date.value,
      prep_time: prep_time.value,
      needed_ingredients: needed_ingredients.value
    });
    PlannerHelper.addMealPlan(mealPlanJson).then(data => {
      console.log("post data is", data);
      this.props.refreshMealPlans();
      this.props.closeAddForm();
    });
  };

  handleAddMealPlanWindow = () => {
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal-planner">
            <form id="modal-content-planner" onSubmit={this.handleSubmit}>
              <label>MealPlan:</label>
              <input name="title" type="text">
                {this.props.title}
              </input>
              <label>Meal-Date:</label>
              <input name="planned_date" type="text">
                {this.props.planned_date}
              </input>
              <label>Prep-Time:</label>
              <input name="prep_time" type="text">
                {this.props.prep_time}
              </input>
              <label>
                Ingredients-Required: {this.props.needed_ingredients}
              </label>
              <input name="needed_ingredients" type="text"></input>
              <button
                id="close-planner"
                // onClick={this.props.toggleAddForm}
              >
                Plan it!
              </button>
            </form>
            <Calendar />
          </div>
        )}
      </div>

      // <Modal />
    );
  };

  render() {
    console.log(this.props);
    console.log(this.props.addMealPlan, "this.props.addMealPlan");
    console.log(this.props.planned_date, "props of planned date");

    return <div>{this.handleAddMealPlanWindow()}</div>;
  }
}

export default AddMealPlan;
