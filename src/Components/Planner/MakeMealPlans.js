import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../Helpers/Token";
import PlannerHelper from "../../Helpers/Planner";

class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMealPlan: false,
      newMealPlan: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props, "this props");
    let { title, planned_date, prep_time, needed_ingredients } = e.target;
    const mealPlanJson = JSON.stringify({
      title: title.value,
      planned_date: planned_date.value,
      prep_time: prep_time.value,
      needed_ingredients: needed_ingredients.value
    });
    PlannerHelper.addMealPlan(mealPlanJson).then(data => {
      console.log("post data is", data);
      this.props.closeAddForm();
    });
  };

  handleAddMealPlanWindow = () => {
    // console.log(this.state);
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal">
            <form id="modal-content" onSubmit={this.handleSubmit}>
              <label>Mealplan:</label>
              <input type="text">{this.props.title}</input>
              <label>Meal Date:</label>
              <input type="text">{this.props.planned_date}</input>
              <label>Prep Time:</label>
              <input type="text">{this.props.prep_time}</input>
              <label>
                Ingredients Required: {this.props.needed_ingredients}
              </label>
              <input type="text"></input>
              <button
                id="close"
                // onClick={this.props.toggleAddForm}
              >
                Plan it!
              </button>
            </form>
          </div>
        )}
      </div>

      // <Modal />
    );
  };

  // setStateAddIngredient = () => {
  //   if (this.state.addMealPlan === false) {
  //     this.setState({
  //       addMealPlan: true
  //     })
  //   }
  //   else { this.setState({ addMealPlan: false }) }
  // }

  render() {
    // console.log(this.state.addMealPlan, "this.state.addmealplan");

    return <div>{this.handleAddMealPlanWindow()}</div>;
  }
}

export default AddMealPlan;
