import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from '../config';
import TokenService from '../Helpers/Token.js'
import searchRecipe from '../Components/Recipes/Search-Recipe'
import IndividualRecipe from '../Components/Recipes/Individual-Recipe'



class RecipesRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: []
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  // GET; then set state.ingredients with response
  getRecipes = () => {
    const url = `${config.API_ENDPOINT}/recipes`;
    const authToken = TokenService.getAuthToken();
    console.log('auth token recipes GET is', authToken);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('get recipes data is', data);
        return this.setState({
          recipes: data
        });
      })
  }

  // POST - add recipe in pop-out view

  // PATCH using recipe id, new route

  renderRecipes = () => {
    const recipes = this.state.recipes;
    console.log('recipes in render is', recipes);
    if (recipes.length > 0) {
      return recipes.map((recipe) => {
        return <div key={recipe.id}>
          <Link
            id="individual-recipe"
            to={{
              pathname: `/recipes/${recipe.id}`,
              state: {
                title: recipe.title,
                description: recipe.recipe_description,
                timeToMake: recipe.time_to_make,
              }
            }}
          >
            {recipe.title},
        </Link>
          <p>also inserting status of ingredients, and link to planning a meal</p>
        </div>
      });
    }
  }

  render() {
    return (
      <section>
        <Link to="recipes/search">Search for new recipes</Link>
        {this.state.recipes && this.renderRecipes()}

      </section>
    )
  }
}


export default RecipesRoute;