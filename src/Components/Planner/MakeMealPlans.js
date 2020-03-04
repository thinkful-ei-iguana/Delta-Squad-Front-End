import React, { Component } from "react";
import PlannerHelper from "../../Helpers/Planner";
import RecipeHelper from "../../Helpers/Recipe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      planned_date: "",
      error: null,
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    RecipeHelper.getRecipes()
      .then(recipeData => {
        this.setState({
          recipes: recipeData,
          recipe_id: recipeData.id
        })
      })
  }

  handleChange = e => {
    const value = e.target.value;
    const fieldName = e.target.name;
    if (e.target.value === "default") {
      this.setState({
        recipe: {
          time_to_make: "",
          recipe_ingredients: ""
        }
      });
    }
    else if (e.target.name === "recipe_id") {
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
    if (!this.state.recipe.id) {
      this.setState({
        error: true
      });
    }
    else {
      let selectedRecipe = this.state.recipes.filter(
        recipe => recipe.id === parseInt(this.state.recipe_id)
      );
      const mealPlanJson = JSON.stringify({
        recipeid: selectedRecipe[0].id,
        title: selectedRecipe[0].title,
        planned_date: e.target.planned_date.value,
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
    }
  };

  handleAddMealPlanWindow = () => {
    const indRecipeData = this.state.recipes.map((data, index) => {
      return (
        <option key={index} value={data.id} required>
          {data.title}
        </option>
      );
    });
    return indRecipeData;
  };

  setStateDate = e => {
    this.setState({
      selectedDate: e
    });
  }

  render() {
    let error = this.state.error;
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal-planner">
            <form id="modal-content-planner" onSubmit={this.handleSubmit}>
              {error && <p id="add-plan-error">Something went wrong. <br />Please try again.</p>}
              <label className="plannerLabel">Meal Plan:</label>
              <select
                id="drop-down"
                className="dropDown"
                name="recipe_id"
                type="text"
                onChange={this.handleChange}
              >
                <option name="default" value="default">
                  Select a recipe
                </option>
                {this.handleAddMealPlanWindow()}
              </select>
              {this.state.recipe.id && <div id="hidden-add-plan">
                <label className="plannerLabel" id="meal-date-label">Meal Date:</label>
                <DatePicker id="datepicker" name="planned_date" selected={this.state.selectedDate} onChange={(e) => this.setStateDate(e)} >
                </DatePicker>
                <br />
                <label className="plannerLabel">Prep Time:</label>
                <div className="plannerInfo">
                  <h2 name="time_to_make" type="text">
                    {this.state.recipe.time_to_make} Minutes
                </h2>
                </div>
                <label className="plannerLabel">Ingredients Required:</label>
                <div className="plannerInfo">
                  <h3 type="text">
                    {this.state.recipe.recipe_ingredients &&
                      this.state.recipe.recipe_ingredients.join(", ")}
                  </h3>
                </div>
                {/* <h2 name="needed_ingredients" type="text"></h2> */}
                <button className="smallButton" id="close-planner">
                  Plan it!
              </button>
              </div>}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddMealPlan;
