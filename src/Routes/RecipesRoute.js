import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import TokenService from "../Helpers/Token.js";
import "./RecipesRoute.css";

class RecipesRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      recipes: [],
      error: null
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    const url = `${config.API_ENDPOINT}/recipes`;
    const authToken = TokenService.getAuthToken();
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return this.setState({
          recipes: data
        });
      });
  };

  setStateErrorTrue = () => {
    this.setState({
      error: true
    })
  }

  renderRecipes = () => {
    const recipes = this.state.recipes;
    if (recipes.length > 0) {
      return recipes.map(recipe => {
        return (
          <div key={recipe.id}>
            <Link
              className="individual-recipe"
              to={{
                pathname: `/recipes/${recipe.id}`,

              }}
            >
              <li>{recipe.title}</li>
            </Link>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <section className="recipeSection">
        <Link to="recipes/search">
          <button className="bigButton">Search for new recipes</button>
        </Link>
        <Link to="recipes/create">
          <button className="bigButton">Create new recipe</button>
        </Link>
        {this.state.recipes.length === 0 ? <><p id="no-recipes-in-list">You don't have any saved recipes yet.</p> <p>Click above to search for or create a recipe.</p></> : <h1 id="recipeHeader">My Recipes:</h1>}
        {this.state.recipes && this.renderRecipes()}
      </section>
    );
  }
}

export default RecipesRoute;
