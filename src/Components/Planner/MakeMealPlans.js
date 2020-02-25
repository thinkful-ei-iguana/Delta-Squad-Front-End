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
      recipe: []
    };
  }

  componentDidMount() {
    // this.getIngredients();
    RecipeHelper.getRecipes()
      .then(recipeData => {
        console.log(recipeData, "this is foo");
        this.setState({
          recipes: recipeData
        });
        // console.log(this.state.recipes);
        let data = this.state.recipes;
        // console.log(data);
        const indRecipeData = this.state.recipes.map(data => {
          // console.log(data.id, "this is data");
        });
        let id = 2;
        for (id = 1; id < this.state.recipes.length; id++) {
          this.state.recipe.id = this.state.recipes.id;
        }
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

  handleSubmit = e => {
    e.preventDefault();
    let {
      recipeid,
      title,
      planned_date,
      time_to_make,
      needed_ingredients
    } = e.target;
    const mealPlanJson = JSON.stringify({
      recipeid: recipeid.value,
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
  // on change/setState?
  // for drop down to select individual portions of recipeById => recipeId
  handleAddMealPlanWindow = () => {
    return (
      <div>
        {this.props.addMealPlan === true && (
          <div id="modal-planner">
            <form id="modal-content-planner" onSubmit={this.handleSubmit}>
              <label>MealPlan:</label>
              <select
                className="mealplantitle-select"
                name="recipeid"
                type="text"
              >
                <option value="{this.state.recipe[0].recipeid}">
                  {this.state.recipes[0].title}
                </option>
                <option value="{this.state.recipe[0].recipeid}">
                  {this.state.recipes[1].title}
                </option>
                <option value="{this.state.recipe[0].recipeid}">
                  {this.state.recipes[2].title}
                </option>
              </select>
              <label>Meal Date:</label>
              <input name="planned_date" type="text">
                {this.props.planned_date}
              </input>
              <label>Prep Time:</label>
              <h2 name="time_to_make" type="text">
                {this.state.recipe.time_to_make}
              </h2>
              <label>Ingredients-Required:</label>
              <h3 onChange={this.setState()}>
                {this.state.recipe.recipe_ingredients &&
                  this.state.recipe.recipe_ingredients.join(", ")}
              </h3>
              <h2 name="needed_ingredients" type="text"></h2>
              <button id="close-planner">Plan it!</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  render() {
    console.log(this.state, "render this state");
    return <div>{this.handleAddMealPlanWindow()}</div>;
  }
}

export default AddMealPlan;
