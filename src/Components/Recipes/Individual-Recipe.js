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
    //console.log('recipeid is:', recipeId);
    //console.log('ingredients:', this.state.recipe.recipe_ingredients)
    RecipeHelper.recipeById(recipeId).then(
      recipeData =>
      {console.log('recipeData:', recipeData)
        this.setState({
          recipe: recipeData
        }) 
        RecipeHelper.getRecipeOwnerData(recipeData.owner).then(ownerData => {
          this.setState({ owner: ownerData });
        })}
    )
    .then(console.log('state is:', this.state.recipe));

    
  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeid).then(
      this.props.history.push("/")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="delete-recipe-button-div">
          <button className="delete-recipe-button" onClick={this.deleteRecipe}>
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
            to={`/Edit-Recipe/${this.state.recipe.id}`}
          >
            Edit Recipe
          </Link>
        </div>
      );
    }
  };

  render() {
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
          {this.state.recipe.recipe_ingredients}
        </p>
       
        <p className="recipePageHeader">Recipe Description: </p>
        <p className="recipeInfo">
          {this.state.recipe.recipe_description}
        </p>

        <p className="recipePageHeader">Time to make the recipe:</p>
        <p className="recipeInfo">{this.state.recipe.time_to_make}</p>

        <p>Owner:</p>
        <p className="recipeInfo">{this.state.recipe.owner}</p>
        <span className="recipe-date_created">
          Date Created: {this.state.recipe.date_created}
        </span>
        <div>{this.deleteOption()}</div>
        <div>{this.ownerOption()}</div>
        <Link to="/">
          <button className="cancel-view">Cancel</button>
        </Link>
      </div>
    );
  }
}
