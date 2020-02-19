import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import TokenService from "../Helpers/Token";
import AddIngredient from "../Components/Pantry/AddIngredient";
import "../Components/Pantry/Pantry.css";
import ModalMod from "../Components/Modal/Modal";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import "../index.css";

class PantryRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      addIngredient: false,
      filtered: [],
      sorted: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.getIngredients();
  }

  // GET; then set state.ingredients with response
  getIngredients = () => {
    const url = `${config.API_ENDPOINT}/pantry`;
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
        console.log("get ingredients data  is", data);
        this.setState({
          ingredients: data
        });
      });
  };

  renderIngredients = () => {
    const ingredients = this.state.ingredients;

    // const ingredients = this.state.ingredients.sort();
    console.log("ingredients is", ingredients);
    return ingredients.map(ingredient => (
      <section className="individual-ingredients" key={ingredient.id}>
        <h2 className="ingredient-name">{ingredient.ingredient_name.toLowerCase()}</h2>
        <span className="ingredient-stock">{ingredient.in_stock}</span>{" "}
        {/* <Link
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
        > */}
        <ModalMod
          id={ingredient.id}
          ingredient_name={ingredient.ingredient_name}
          in_stock={ingredient.in_stock}
          notes={ingredient.notes}
          ingredient_owner={ingredient.ingredient_owner} />
        {/* View/Edit */}
        {/* </Link> */}
      </section>
    ));
  };

  renderIngredientsAlpha = () => {

    const ingredients = this.state.ingredients.sort(this.compareValues('ingredient_name'));
    this.setState({ ingredients: ingredients })

    // const ingredients = this.state.ingredients.sort();
    console.log("ingredients is", ingredients);
    return ingredients.map(ingredient => (
      <section className="individual-ingredients" key={ingredient.id}>
        <h2 className="ingredient-name">{ingredient.ingredient_name.toLowerCase()}</h2>
        <span className="ingredient-stock">{ingredient.in_stock}</span>{" "}
        {/* <Link
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
        > */}
        <ModalMod
          id={ingredient.id}
          ingredient_name={ingredient.ingredient_name}
          in_stock={ingredient.in_stock}
          notes={ingredient.notes}
          ingredient_owner={ingredient.ingredient_owner} />
        {/* View/Edit */}
        {/* </Link> */}
      </section>
    ));
  };

  renderIngredientsFilter = (e) => {  // need to force rerendering
    console.log('e.targetval', e.target.value);
    // if (name.value === 'name') {
    //   const ingredients = this.state.ingredients.sort(this.compareValues('ingredient_name'));
    // }
    // else if ()
    const ingredients = this.state.ingredients.sort(this.compareValues('in_stock'));
    this.setState({ ingredients: ingredients })
    // const ingredients = this.state.ingredients.sort();
    console.log("ingredients is", ingredients);
    return ingredients.map(ingredient => (
      <section className="individual-ingredients" key={ingredient.id}>
        <h2 className="ingredient-name">{ingredient.ingredient_name.toLowerCase()}</h2>
        <span className="ingredient-stock">{ingredient.in_stock}</span>{" "}
        {/* <Link
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
        > */}
        <ModalMod
          id={ingredient.id}
          ingredient_name={ingredient.ingredient_name}
          in_stock={ingredient.in_stock}
          notes={ingredient.notes}
          ingredient_owner={ingredient.ingredient_owner} />
        {/* View/Edit */}
        {/* </Link> */}
      </section>
    ));
  };

  // setStateAddIngredientTrue = () => {
  //   this.setState({ addIngredient: true });
  // };
  // setStateAddIngredientFalse = () => {
  //   this.setState({ addIngredient: false });
  // };

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  filterInventory = () => {
    this.renderIngredientsInventory();
  }

  filterName = () => {
    this.renderIngredientsAlpha();
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    this.setState({ error: null });
    const searchInput = this.state.searchTerm;
    const url = `${config.API_ENDPOINT}/pantry`;

    // create a query string with the band being searched for
    let queryString = "?q=" + searchInput;
    const newUrl = url + queryString
    const authToken = TokenService.getAuthToken();

    fetch(newUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('data of ingredient search req is', data);
        this.setState({ ingredients: data })
      });

  }

  handleInput(e) {  // from search bar
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (

      <section id="pantry-router-container">
        <h2 id="my-pantry-header">My Pantry</h2>
        <p>Filter by:</p>
        <select id="pantry-filter" onChange={(e) => this.renderIngredientsFilter(e)}>
          <option name="default" value="">No filter</option>
          <option name="name" value="">Name</option>
          <option name="in-stock" value="">Inventory</option>
        </select>
        <form onSubmit={this.handleSearchSubmit}>
          <label
            htmlFor="ingredient-search-field"
          >Search</label>
          <input
            type="text"
            name="ingredient-search"
            id="ingredient-search-field"
            value={this.state.searchTerm}
            onChange={this.handleInput.bind(this)}
          ></input>
          <button type="submit">Search</button>
        </form>
        {/* <button id="add-ingredient-button" type="submit" onClick={() => this.setStateAddIngredientTrue()}>
          Add an ingredient
          </button> */}
        <AddIngredient
          addIngredient={this.state.addIngredient}
          allIngredients={this.state.ingredients}
          refreshIngredients={this.getIngredients}
          closeAddForm={this.setStateAddIngredientFalse}
        />
        <div id="ingredients-container">

          {this.state.ingredients && this.renderIngredients()}
        </div>


      </section>
    );
  }
}

export default PantryRoute;
