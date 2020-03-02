import React from "react";
import Recipe from "../../Helpers/Recipe";
import _ from "lodash";

export default class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recipeId: ""
    };
  }

  componentDidMount() {
    this.getRecipeInstructions();
  }

  backToSearch = () => {
    this.props.history.push("/recipes/search")
  }

  getRecipeInstructions = () => {
    let recipeId = _.get(this, "props.location.state.recipeId");
    let URL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=baa0b2cbf1a547a9addbdc0c04fe5037`;

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(recipe => {
        this.setState({
          recipe: recipe,
          recipeId: recipeId,
          ingredients: recipe.extendedIngredients,
          instructions: recipe.analyzedInstructions[0]
        });
      })
      .catch(err => {
        this.setState({
          error: "Sorry could not find that"
        });
      });
  };

  handleCreationSuccess = () => {
    window.location.pathname = "/recipes"
  };

  addRecipe = () => {
    let instructionsSet = [];
    let ingredientsSet = [];
    if (this.state.instructions) {
      this.state.instructions.steps.map(instruction =>
        instructionsSet.push(instruction.step)
      );
    }
    else {
      instructionsSet = ["Instructions N/A"];
    }
    this.state.ingredients.map(ing => ingredientsSet.push(ing.name));
    let recipeObj = {
      title: this.state.recipe.title,
      recipe_description: instructionsSet,
      recipe_ingredients: ingredientsSet,
      time_to_make: this.state.recipe.readyInMinutes
    };
    Recipe.createRecipe(recipeObj)
      .then(recipe => {
        this.handleCreationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {

    let instructionsArr = [];
    if (this.state.instructions) {
      this.state.instructions.steps.map(instruction =>
        instructionsArr.push(instruction.step)
      );
    }
    return (
      <div className="view" id="recipeView">
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${this.state.recipe.image})` }}
          />
        </div>
        <p className="recipePageHeader">Title:</p>
        <p className="recipeInfo">{this.state.recipe.title}</p>
        <p className="recipePageHeader">Recipe Ingredients:</p>
        <p className="recipeInfo">
          {this.state.ingredients &&
            this.state.ingredients.map(ingredient => `${ingredient.name}, `)}
        </p>

        <p className="recipePageHeader">Recipe Instructions: </p>
        <section className="recipeInfo instructions">
          {instructionsArr.map(inst => (
            <p key={inst}>{inst}</p>
          ))}
        </section>

        <p className="recipePageHeader">Time to make the recipe:</p>
        <p className="recipeInfo">
          {this.state.recipe.readyInMinutes}{" "}
          minutes
        </p>
        <div className="buttonGroupSearch">
          <button className="medButton" onClick={this.addRecipe}>Add to my recipes!</button>
          <button className="medButton" onClick={this.backToSearch}>Cancel</button>
        </div>
      </div>
    );
  }
}
