import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom"; import config from "../config";
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
      filteredIngredients: [],
      sorted: [],
      searchTerm: "",
      filterOption: "",
      isOpen: false,
      show: false
    };
  }

  componentDidMount() {
    this.getIngredients();
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

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
          ingredients: data,
          filteredIngredients: data
        });
      });
  };

  setFilterOption = (e) => {
    console.log('setfilter option this.state.filterOption is', e.target.value);
    this.setState({ filterOption: e.target.value });
  }

  renderIngredients = () => {
    let ingredients = this.state.ingredients;
    console.log('props pantry route to modal is', this.props);
    if (this.state.filterOption === "in-stock") {
      const ingredientsInStock = this.state.ingredients.sort(this.compareValues('in_stock'));
      ingredients = ingredientsInStock.filter(ingredient => ingredient.in_stock === "in-stock")
    }
    else if (this.state.filterOption === "out-of-stock") {
      const ingredientsOutOfStock = this.state.ingredients.sort(this.compareValues('in_stock'));
      ingredients = ingredientsOutOfStock.filter(ingredient => ingredient.in_stock === "out-of-stock")
    }
    else if (this.state.filterOption === "low") {
      const ingredientsLow = this.state.ingredients.sort(this.compareValues('in_stock'));
      ingredients = ingredientsLow.filter(ingredient => ingredient.in_stock === "low")
    }

    let ingredientJSXArray = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingredientJSXArray.push(
        <section className="individual-ingredients" key={ingredients[i].id}>
          <h2 className="ingredient-name">{ingredients[i].ingredient_name.toLowerCase()}</h2>
          <span className="ingredient-stock">{ingredients[i].in_stock}</span>{" "}
          <ModalMod
            id={ingredients[i].id}
            ingredient_name={ingredients[i].ingredient_name}
            in_stock={ingredients[i].in_stock}
            notes={ingredients[i].notes}
            ingredient_owner={ingredients[i].ingredient_owner}
            history={this.props.history}
            getIngredients={this.getIngredients}
          />
        </section>
      );
    }
    return ingredientJSXArray;
  };

  // console.log("name selected");
  //     const ingredientsName = this.state.ingredients.sort(this.compareValues('in_stock'));
  //     console.log("ingredientsName", ingredientsName);
  //     this.setState({ filteredIngredients: ingredientsName });


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
        <select id="pantry-filter" onChange={(e) => this.setFilterOption(e)}>
          <option name="default" value="default">No filter</option>
          <option name="in-stock" value="in-stock">In stock</option>
          <option name="in-stock" value="low">Low</option>

          <option name="in-stock" value="out-of-stock">Out of stock</option>
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
        // closeAddForm={this.setStateAddIngredientFalse}
        />
        <div id="ingredients-container">

          {(this.renderIngredients())}

        </div>


      </section>
    );
  }
}

export default PantryRoute;
