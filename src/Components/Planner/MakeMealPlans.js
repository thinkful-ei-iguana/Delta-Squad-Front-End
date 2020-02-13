import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../Helpers/Token";
import PlannerHelper from "../../Helpers/Planner";

class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      planned_date: "",
      prep_time: "",
      needed_ingredients: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // const created_by = this.context.currentUser.id;
    let { title, planned_date, prep_time, needed_ingredients } = e.target;
    this.setState({ error: null });
    const mealJson = JSON.stringify({
      title: title.value,
      planned_date: planned_date.value,
      prep_time: prep_time.value,
      needed_ingredients: needed_ingredients.value
      // mealplan_owner: mealplan_owner.value,
      // created_by: created_by.value
    });
    PlannerHelper.addMealPlan(mealJson).then(data => {
      console.log("post data is", data);
      this.props.closeAddForm();
    });
  };

  handleAddMealPlan = () => {
    console.log(this.state, "this state");
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal">
            <form id="modal-content" onSubmit={this.handleSubmit}>
              <label>Title:</label>
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
                Hit it!
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
    console.log(this.state.addMealPlan);

    return <div>{this.handleAddMealPlan()}</div>;
  }
}

export default AddMealPlan;
