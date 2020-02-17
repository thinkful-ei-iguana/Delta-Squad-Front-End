import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from '../config';
import TokenService from '../Helpers/Token.js'
import searchRecipe from '../Components/Recipes/Search-Recipe'
import IndividualRecipe from '../Components/Recipes/Individual-Recipe'


class RecipesRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  // GET; then set state.ingredients with response
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
        // console.log("get recipes data is", data);
        return this.setState({
          recipes: data
        });
      });
  };

  // POST - add recipe in pop-out view

  // PATCH using recipe id, new route

  renderRecipes = () => {
    const recipes = this.state.recipes;
    console.log("recipes in render is", this.state);
    if (recipes.length > 0) {
      return recipes.map(recipe => {
        return (
          <div key={recipe.id}>
            <Link
              id="individual-recipe"
              to={{
                pathname: `/recipes/${recipe.id}`,
                state: {
                  title: recipe.title,
                  description: recipe.recipe_description,
                  timeToMake: recipe.time_to_make
                }
              }}
            >
              {recipe.title}
            </Link>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <section>
        <Link to="recipes/search"><button className="bigButton">Search for new recipes</button></Link>
        <Link to="recipes/create"><button className="bigButton">Create new recipe</button></Link>
        {this.state.recipes && this.renderRecipes()}

      </section>
    )
  }
}

export default RecipesRoute;
