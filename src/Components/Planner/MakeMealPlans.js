import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../Helpers/Token";
import PlannerHelper from "../../Helpers/Planner";
// import RecipesRoute from "../../Routes/RecipesRoute";
import RecipeHelper from "../../Helpers/Recipe";
// import { Link } from "react-router-dom";
import Context from "../../Contexts/Context";
import "./Mealplan.css";
// import PantryRoute from "../../Routes/PantryRoute";
// import AddIngredient from "../../Components/Pantry/AddIngredient";

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
    // this.getIngredients();
    RecipeHelper.getRecipes()
      .then(recipeData => {
        this.setState({
          recipes: recipeData,
          recipe_id: recipeData[0].id
        });
        // console.log(this.state.recipes);
        let data = this.state.recipes;
        // console.log(data);
        let id = 2;
        // for (id = 1; id < this.state.recipes.length; id++) {
        //   this.state.recipe.id = this.state.recipes.id;
        // }
        // individual recipe.id === recipes.id
        const recipeid = id || this.state.recipes.recipes_owner;
        RecipeHelper.recipeById(recipeid)
          .then(indRecipeData => {
            // console.log("recipeData:", recipeData);
            this.setState({
              recipe: indRecipeData
            });
          })
          // .then(console.log("state is:", this.state))
          .catch(error => {
            console.error(error);
          });
      })
      .then(console.log("state is:", this.state));
  }

  // getIngredients = () => {
  //   const url = `${config.API_ENDPOINT}/planner`;
  //   const authToken = TokenService.getAuthToken();
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(ingredientData => {
  //       console.log("get ingredients data  is", ingredientData);
  //       this.setState({
  //         ingredients: ingredientData
  //       });
  //     });
  // };

  handleChange = e => {
    const value = e.target.value;
    const fieldName = e.target.name;
    if (e.target.name === "recipe_id") {
      RecipeHelper.recipeById(value)
        .then(indRecipeData => {
          // console.log("recipeData:", recipeData);
          this.setState({
            recipe: indRecipeData,
            [fieldName]: value
          });
        })
        // .then(console.log("state is:", this.state))
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
  // on change/setState?
  // for drop down to select individual portions of recipeById => recipeId
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
              <label className="plannerLabel">MealPlan:</label>
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
              <button className="smallButton" id="close-planner">Plan it!</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddMealPlan;
