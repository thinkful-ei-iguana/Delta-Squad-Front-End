import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../Helpers/Token";
import PlannerHelper from "../../Helpers/Planner";
import RecipesRoute from "../../Routes/RecipesRoute";
import RecipeHelper from "../../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "../../Contexts/Context";
import "./Mealplan.css";

class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMealPlan: false,
      newMealPlan: [],
      postMealPlan: [],
      recipe: {},
      owner: {}
    };
  }

  componentDidMount() {
    RecipeHelper.getRecipes()
      .then(recipeData => {
        console.log(recipeData, "this is foo");
        this.setState({
          recipe: recipeData
        });
        RecipeHelper.getRecipeOwnerData(recipeData.owner).then(ownerData => {
          this.setState({ owner: ownerData });
        });
      })
      .then(console.log("state is:", this.state.recipe));
  }

  handleSubmit = e => {
    e.preventDefault();
    let { title, planned_date, time_to_make, needed_ingredients } = e.target;
    const mealPlanJson = JSON.stringify({
      title: title.value,
      planned_date: planned_date.value,
      time_to_make: time_to_make.value,
      needed_ingredients: needed_ingredients.value
    });
    PlannerHelper.addMealPlan(mealPlanJson).then(data => {
      console.log("post data is", data);
      this.props.refreshMealPlans();
      this.props.closeAddForm();
    });
  };

  handleAddMealPlanWindow = () => {
    console.log(this.props, "this.props");
    console.log(this.state, "this.state");
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal-planner">
            <form id="modal-content-planner" onSubmit={this.handleSubmit}>
              <label>MealPlan:</label>
              <select className="mealplantitle-select" name="title" type="text">
                <option>{this.state.recipe[0].title}</option>
                <option>{this.state.recipe[1].title}</option>
              </select>
              <label>Meal Date:</label>
              <input name="planned_date" type="text">
                {this.props.planned_date}
              </input>
              <label>Prep Time:</label>
              <h2 name="time_to_make" type="text">
                {this.state.recipe.time_to_make}
              </h2>
              <label>
                Ingredients-Required: {this.props.needed_ingredients}
              </label>
              <h2 name="needed_ingredients" type="text"></h2>
              <button
                id="close-planner"
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

  render() {
    console.log(this.props);
    console.log(this.props.addMealPlan, "this.props.addMealPlan");
    console.log(this.props.planned_date, "props of planned date");

    return <div>{this.handleAddMealPlanWindow()}</div>;
  }
}

export default AddMealPlan;
