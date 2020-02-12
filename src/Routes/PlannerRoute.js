import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import TokenService from "../Helpers/Token";

class PlannerRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: [],
      meal_date: [],
      prep_time: [],
      ingredients_required: []
    };
  }

  componentDidMount() {
    this.getTitle();
    this.getMealDate();
    this.getPrepTime();
    this.getIngredientsReq();
  }

  // GET; then set state.title with response
  getTitle = () => {
    console.log("planner route get title");
    const url = `${config.API_ENDPOINT}/planner`;
    const authToken = TokenService.getAuthToken();
    console.log("auth token is", authToken);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("get title data is", data);
        return this.setState({
          title: data
        });
      });
  };

  getMealDate = () => {
    console.log("planner route get meal date");
    const url = `${config.API_ENDPOINT}/planner`;
    const authToken = TokenService.getAuthToken();
    console.log("auth token is", authToken);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("get title data is", data);
        return this.setState({
          meal_date: data
        });
      });
  };

  getPrepTime = () => {
    console.log("planner route get prep time");
    const url = `${config.API_ENDPOINT}/planner`;
    const authToken = TokenService.getAuthToken();
    console.log("auth token is", authToken);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("get prep time data is", data);
        return this.setState({
          meal_date: data
        });
      });
  };

  // POST - add ingredient in pop-out view

  // PATCH using ingredient id, new route

  renderIngredients = () => {
    const ingredients = this.state.ingredients;
    console.log("ingredients is", ingredients);
    if (ingredients.length > 0) {
      return ingredients.map(ingredient => (
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
        >
          {ingredient.ingredient_name},
        </Link>
      ));
    }
  };

  render() {
    return <section>{this.renderIngredients()}</section>;
  }
}

export default PlannerRoute;
