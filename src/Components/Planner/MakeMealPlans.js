import React, { Component } from "react";
import PlannerHelper from "../../Helpers/Planner";
import RecipeHelper from "../../Helpers/Recipe";
import "./Mealplan.css";


class AddMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMealPlan: false,
      newMealPlan: [],
      postMealPlan: [],
      recipes: [],
      ingredients: {},
      recipe: [],
      recipe_id: 0,
      planned_date: ""
    };
  }

  componentDidMount() {
    RecipeHelper.getRecipes()
      .then(recipeData => {
        this.setState({
          recipes: recipeData,
          recipe_id: recipeData.id
        });
        let id = 2;
        const recipeid = id || this.state.recipes.recipes_owner;
        RecipeHelper.recipeById(recipeid)
          .then(indRecipeData => {
            this.setState({
              recipe: indRecipeData
            });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .then(console.log("state is:", this.state));
  }

  handleChange = e => {
    const value = e.target.value;
    const fieldName = e.target.name;
    if (e.target.name === "recipe_id") {
      RecipeHelper.recipeById(value)
        .then(indRecipeData => {
          this.setState({
            recipe: indRecipeData,
            [fieldName]: value
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.setState({
        [fieldName]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let selectedRecipe = this.state.recipes.filter(
      recipe => recipe.id === parseInt(this.state.recipe_id)
    );
    const mealPlanJson = JSON.stringify({
      recipeid: selectedRecipe[0].id,
      title: selectedRecipe[0].title,
      planned_date: this.state.planned_date,
      time_to_make: selectedRecipe[0].time_to_make,
      needed_ingredients:
        this.state.recipe.recipe_ingredients.length > 1
          ? this.state.recipe.recipe_ingredients.join(", ")
          : this.state.recipe.recipe_ingredients
    });
    PlannerHelper.addMealPlan(mealPlanJson).then(data => {
      this.props.refreshMealPlans();
      this.props.closeAddForm();
    });
  };
  handleAddMealPlanWindow = () => {
    const indRecipeData = this.state.recipes.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.title}
        </option>
      );
    });
    return indRecipeData;
  };

  render() {
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal-planner">
            <form id="modal-content-planner" onSubmit={this.handleSubmit}>
              <label className="plannerLabel">Meal Plan:</label>
              <select
                className="dropDown"
                name="recipe_id"
                type="text"
                onChange={this.handleChange}
              >
                {this.handleAddMealPlanWindow()}
              </select>
              <label className="plannerLabel">Meal Date:</label>
              <input
                name="planned_date"
                type="text"
                className="modalInput"
                onChange={this.handleChange}
              >
                {this.props.planned_date}
              </input>
              <label className="plannerLabel">Prep Time:</label>
              <div className="plannerInfo">
                <h2 name="time_to_make" type="text">
                  {this.state.recipe.time_to_make} Minutes
                </h2>
              </div>
              <label className="plannerLabel">Ingredients-Required:</label>
              <div className="plannerInfo">
                <h3 type="text">
                  {this.state.recipe.recipe_ingredients &&
                    this.state.recipe.recipe_ingredients.join(", ")}
                </h3>
              </div>
              <h2 name="needed_ingredients" type="text"></h2>
              <button className="smallButton" id="close-planner">
                Plan it!
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddMealPlan;
