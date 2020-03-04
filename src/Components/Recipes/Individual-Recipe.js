import React from "react";
import RecipeHelper from "../../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "../../Contexts/Context";
import './Individual-Recipe.css'

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      owner: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipeHelper.recipeById(recipeId).then(
      recipeData => {
        this.setState({
          recipe: recipeData,
          owner: recipeData.recipe_owner
        })
      }
    )
    // .then(console.log('state is:', this.state.recipe));


  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeId).then(
      this.props.history.push("/recipes")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="delete-recipe-button-div">
          <button className="medButton" onClick={this.deleteRecipe}>
            Delete Recipe
          </button>
        </div>
      );
    }
  };

  ownerOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="ownerSelectors">
          <Link
            className="editRecipe"
            to={{
              pathname: `/edit-recipe/${this.state.recipe.id}`,
              state: this.state,
            }}


          >
            <button className="medButton">Edit Recipe</button>

          </Link>
        </div>
      );
    }
  };

  render() {
    let instructionsArr = []
    if (this.state.recipe.recipe_description) {
      let desc = this.state.recipe.recipe_description.slice(2);
      let desc1 = desc.slice(0, -2);
      let descarr = desc1.split('","');
      descarr.map(instruction => instructionsArr.push(instruction))
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
          {this.state.recipe.recipe_ingredients &&
            this.state.recipe.recipe_ingredients.join(', ')}
        </p>

        <p className="recipePageHeader">Recipe Instructions: </p>
        <div className="recipeInfo">
          {instructionsArr.map(
            inst => <p key={inst}>{inst}</p>)}
        </div>

        <p className="recipePageHeader">Time to make the recipe:</p>
        <p className="recipeInfo">{this.state.recipe.time_to_make} Minutes</p>

        <div className="buttonGroup">
          <div>{this.ownerOption()}</div>
          <div>{this.deleteOption()}</div>
          <Link to="/recipes">
            <button className="cancel-view medButton">Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}
