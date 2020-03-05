import React, { Component } from "react";
import config from "../config";
import TokenService from "../Helpers/Token";
import AddIngredient from "../Components/Pantry/AddIngredient";
import IndividualIngredient from "../Components/Pantry/IndividualIngredient";
import "../Components/Pantry/Pantry.css";
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
      show: false,
      error: null
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
        this.setState({
          ingredients: data,
          filteredIngredients: data
        });
      });
  };

  setFilterOption = (e) => {
    this.setState({ filterOption: e.target.value });
  }

  renderIngredients = () => {
    let ingredients = this.state.ingredients;
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
          <div className="ingredientNameContainer"><h2 className="ingredient-name ">{ingredients[i].ingredient_name.toLowerCase()}</h2></div>
          <div className="ingredientInfoContainer">
            <span className="ingredient-stock">{ingredients[i].in_stock}</span>{" "}
          </div>
          <IndividualIngredient
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
        this.setState({
          ingredients: data
        })
      });

  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }


  render() {
    // let error = this.state.error;
    return (

      <section id="pantry-router-container">
        <h2 id="my-pantry-header">My Pantry</h2>
        <p id="pantry-text">
          Add, organize, and keep track of the ingredients in your kitchen
        </p>
        <form onSubmit={this.handleSearchSubmit} className="pantrySearch">
          <label
            htmlFor="ingredient-search-field" className="randomLabel"
          >Search Pantry</label>
          <br></br>
          <input
            type="text"
            name="ingredient-search"
            id="ingredient-search-field"
            placeholder="ingredient"
            value={this.state.searchTerm}
            onChange={this.handleInput.bind(this)}
          ></input>
          <br></br>
          <button type="submit" className="smallButton">Search</button>
        </form>
        <p className="randomLabel">Filter by:</p>
        <select id="pantry-filter" className="dropDown" onChange={(e) => this.setFilterOption(e)}>
          <option name="default" value="default">No filter</option>
          <option name="in-stock" value="in-stock">In stock</option>
          <option name="in-stock" value="low">Low</option>

          <option name="in-stock" value="out-of-stock">Out of stock</option>
        </select>
        <AddIngredient
          addIngredient={this.state.addIngredient}
          allIngredients={this.state.ingredients}
          refreshIngredients={this.getIngredients}
        />
        {this.state.ingredients.length > 0 &&
          <div id="ingredients-container">

            {this.renderIngredients()}

          </div>}


      </section >
    );
  }
}

export default PantryRoute;
