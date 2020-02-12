import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from '../config';
import TokenService from '../Helpers/Token'


class PantryRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: []
    }
  }

  componentDidMount() {
    this.getIngredients();
  }

  // GET; then set state.ingredients with response
  getIngredients = () => {
    console.log('pantry route get ingredients');
    const url = `${config.API_ENDPOINT}/pantry`;
    const authToken = TokenService.getAuthToken();
    console.log('autho token is', authToken);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('get ingredients data is', data);
        return this.setState({
          ingredients: data
        });
      })
  }

  // POST - add ingredient in pop-out view


  // PATCH using ingredient id, new route

  renderIngredients = () => {
    const ingredients = this.state.ingredients;
    console.log('ingredients is', ingredients);
    if (ingredients.length > 0) {
      return (ingredients.map(ingredient =>
        <Link
          to={{
            pathname: `/pantry/${ingredient.id}`,
            state: {
              ingredient_name: ingredient.ingredient_name,
              in_stock: ingredient.in_stock,
              notes: ingredient.notes,
              ingredient_owner: ingredient.ingredient_owner
            }
          }}
        >{ingredient.ingredient_name},
        </Link>
      )
      );
    }
  }

  render() {
    return (
      <section>
        {this.renderIngredients()}

      </section>
    )
  }
}

export default PantryRoute;