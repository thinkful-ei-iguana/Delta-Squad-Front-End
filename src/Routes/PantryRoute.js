import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from '../config';
import TokenService from "../Helpers/Token";
import AddIngredient from "../Components/Pantry/AddIngredient";
import "../Components/Pantry/Pantry.css"
// import Modal from "../Components/Modal/Modal";


class PantryRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: [],
      addIngredient: false
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
        console.log('get ingredients data  is', data);
        this.setState({
          ingredients: data,
        });
      })
  }

  // POST - add ingredient in pop-out view


  // PATCH using ingredient id, new route

  renderIngredients = () => {
    const ingredients = this.state.ingredients;
    console.log('ingredients is', ingredients);

    return (ingredients.map(ingredient =>
      <section className="individual-ingredients" key={ingredient.id}>
        {/* <Link
          to={{
            pathname: `/pantry/${ingredient.id}`,
            state: {
              ingredient_name: ingredient.ingredient_name,
              in_stock: ingredient.in_stock,
              notes: ingredient.notes,
              ingredient_owner: ingredient.ingredient_owner
            }
          }}
        >*/}
        <h2 className="ingredient-name">{ingredient.ingredient_name}</h2>
        {/* </Link>  */}
        <span className="ingredient-stock">{ingredient.in_stock}</span>
        {' '}
        <Link
          className="edit-ingredient-button"
          to={{
            pathname: `/pantry/${ingredient.id}`,
            state: {
              id: ingredient.id,
              ingredient_name: ingredient.ingredient_name,
              in_stock: ingredient.in_stock,
              notes: ingredient.notes,
              ingredient_owner: ingredient.ingredient_owner
            }
          }}
        >
          View/Edit
        </Link>
        {/* <br /> */}
      </section >
    )
    );
  }


  setStateAddIngredientTrue = () => {
    this.setState({ addIngredient: true })
  }
  setStateAddIngredientFalse = () => {
    this.setState({ addIngredient: false })
  }

  render() {
    console.log('this.state.add', this.state.addIngredient)
    return (
      <section id="pantry-router-container">
        <h2 id="my-pantry-header">My Pantry</h2>
        {this.state.ingredients.length > 0 && <button id="add-ingredient-button" type="submit" onClick={() => this.setStateAddIngredientTrue()}>
          Add an ingredient
          </button>}
        <div id="ingredients-container">

          {this.state.ingredients && this.renderIngredients()}
        </div>
        <AddIngredient
          addIngredient={this.state.addIngredient}
          allIngredients={this.state.ingredients}
          refreshIngredients={this.getIngredients}
          closeAddForm={this.setStateAddIngredientFalse}
        />

      </section>
    )
  }
}



export default PantryRoute;
